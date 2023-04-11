import {useEffect, useState} from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import {
    Container,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    DialogActions, Button, DialogContentText, FormControl, InputLabel, Select
} from '@mui/material';

import SearchBar from "../../../components/searchBar";
import TwoSmallButtonGroup from "../../../components/TwoSmallButtonGroup";
import ParcelTable from "./parcel-components/ParcelTable";
import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'
import './parcel-main.css';
import {useDispatch, useSelector} from "react-redux";
import {createParcelThunk, findAllParcelsThunk, updateParcelThunk} from "../../../redux/parcels/parcels-thunks";
import {FilterList as FilterIcon} from "@mui/icons-material";
import MerchantParcelTable from "../../Merchant/1-Parcels/MerchantParcelTable";



const ParcelMainPage = () => {

    // ---------nav bar---------
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // ---------user role---------
    const role = useSelector(state => state.auth.role);


    // ---------search bar---------
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log(tableData);
        setTableData(
            parcels.filter((val) => {
            if (searchTerm === "") {
                return val;
            } else if (val.trackingNumber.match(searchTerm)) {
                return val;
            }
        }))
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // ---------Add parcel dialog---------
    const [openAddParcel, setOpenAddParcel] = useState(false);
    const handleOpenAddParcel = () => {
        setOpenAddParcel(true);
    }
    const handleCloseAddParcel = () => {
        setOpenAddParcel(false);
    }

    const dispatch = useDispatch();
    const handleAddNewParcel = (props) => {
        const newParcel = {
            user: "test@test.com",
            name: props.name,
            trackingNumber: props.trackingNumber,
            courier: props.courier,
            picture: props.picture? props.picture : null
        }
        dispatch(createParcelThunk(newParcel));
    }


    // ---------Filter dialog---------
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => {
        setOpenFilter(true);
    }
    const handleCloseFilter = () => {
        setOpenFilter(false);
    }
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterCourier, setFilterCourier] = useState("all");

    const handleFilter  = () => {
        handleCloseFilter();
    }


    // Link to DB
    const { parcels, loading } = useSelector((state) => state.parcels);

    useEffect(() => {
        dispatch(findAllParcelsThunk());
    }, [])

    // Table data
    const [tableData, setTableData] = useState(parcels);
    useEffect(() => {
        setTableData(
            parcels.filter((val) => {
                return filterCourier === "all" || val.courier === filterCourier;
            })
                .filter((val) => {
                    if (filterStatus === "all")
                        return val;
                    else if (filterStatus === "in transit") {
                        return val.isWeighted === false;
                    } else if (filterStatus === "shipped") {
                        return val.isShipped === true;
                    }
                    else {
                        return val.isWeighted === true && val.isShipped === false
                    }
                })
        )
    }, [parcels, filterCourier, filterStatus])

    // ---------Update parcel---------
    const handleUpdateParcel = (props) => {
        dispatch(updateParcelThunk(props));
    }

    return (
        <>
            <Header onOpenNav={handleOpen} />
            {/*-------Box is the layout of the whole page-----*/}
            <Box
                sx={{
                    display: { lg: 'flex' },
                    minHeight: { lg: 1 },
                }}
            >
                {/*--------------Navigation bar------------------*/}
                <NavVertical openNav={open} onCloseNav={handleClose} />

                {/*--------------Main Content----------------------*/}
                <Main>
                    <Container maxWidth={false}>
                        <Typography variant="h4" component="h1" paragraph>
                            My Parcels
                        </Typography>
                    </Container>

                    <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/*---Search Bar---*/}
                        <SearchBar
                            width={360}
                            height={53}
                            searchText="Search by Tracking Number"
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleSearch={handleSearch}
                            handleInputChange={handleInputChange}
                            handleKeyPress={handleKeyPress}
                        />

                        {/*---button group---*/}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {
                                role === "buyer" ? <TwoSmallButtonGroup
                                    leftText="Add New"
                                    rightText="Filter"
                                    onLeftClick={handleOpenAddParcel}
                                    onRightClick={handleOpenFilter}
                                /> :  <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{ height: '48px' }}
                                    startIcon={<FilterIcon />}
                                    onClick={handleOpenFilter}
                                >
                                    Filter
                                </Button>
                            }
                        </Box>
                        <AddParcelDialog open={openAddParcel} onClose={handleCloseAddParcel} handleAddNewParcel={handleAddNewParcel} />
                        <FilterDialog open={openFilter} onClose={handleCloseFilter}
                                        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                                        filterCourier={filterCourier} setFilterCourier={setFilterCourier}
                                        onSubmitFilter={handleFilter}
                        />
                    </Container>

                    {/*---Table---*/}
                    <Container maxWidth={false}>
                        { role === "buyer" ?
                            <ParcelTable data={tableData} /> :
                            <MerchantParcelTable data={tableData}
                                                 handleUpdateParcel={handleUpdateParcel} />}


                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};

const couriers = [
    { value: 'yto', label: 'YTO' },
    { value: 'yunda', label: 'Yunda Express' },
];

const AddParcelDialog = ({ open, onClose, handleAddNewParcel }) => {

    const [name, setName] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [courier, setCourier] = useState('');
    const [picture, setPicture] = useState(null);

    const config2: ImagePickerConf = {
        borderRadius: '100%',
        language: 'en',
        width: '200px',
        height: '200px',
        objectFit: 'cover',
        compressInitial: null,
        hideDeleteBtn: true,
        hideDownloadBtn: true,
        hideEditBtn: true,
        hideAddBtn: true,
    };
    const initialImage = '';

    const handleSubmit = () => {
        handleAddNewParcel({ name, trackingNumber, courier, picture });
        setName("");
        setTrackingNumber("");
        setCourier("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add A New Parcel</DialogTitle>
            <DialogContent>
                {/* <---UploadImage---> */}
                <div className='custom-hover'
                    style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                    <ReactImagePickerEditor
                        config={config2}
                        imageSrcProp={initialImage}
                        imageChanged={(newDataUri: any) => { setPicture(newDataUri) }} />
                </div>
                {/* <---Name---> */}
                <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    style={{ marginBottom: 16 }}
                />

                {/* <---Tracking Number---> */}
                <TextField
                    label="Tracking Number"
                    fullWidth
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    variant="outlined"
                    style={{ marginBottom: 16 }}
                />

                {/* <---Courier---> */}
                <TextField
                    select
                    label="Courier"
                    fullWidth
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    variant="outlined"
                >
                    {couriers.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        onClose();
                        setName("");
                        setTrackingNumber("");
                        setCourier("");
                    }}
                >
                    Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};


const FilterDialog = ({ open, onClose,onSubmitFilter,
                          filterStatus, setFilterStatus,
                          filterCourier, setFilterCourier}) =>
{
    const [localFilterStatus, setLocalFilterStatus] = useState(filterStatus);
    const [localFilterCourier, setLocalFilterCourier] = useState(filterCourier);
    const handleStatusChange = (event) => {
        setLocalFilterStatus(event.target.value);
    };

    const handleCourierChange = (event) => {
        setLocalFilterCourier(event.target.value);
    };

    const onReset = () => {
        setLocalFilterStatus('all');
        setLocalFilterCourier('all');
        onClose();
    }

    const onSubmit = () => {
        setFilterStatus(localFilterStatus);
        setFilterCourier(localFilterCourier);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Filter</DialogTitle>
            <DialogContent>
                <DialogContentText style={{marginBottom:14}}>
                    Please select the filter options below.
                </DialogContentText>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        value={localFilterStatus}
                        onChange={handleStatusChange}
                        label="Status"
                    >
                        <MenuItem value="all" selected>All</MenuItem>
                        <MenuItem value="in transit">In transit</MenuItem>
                        <MenuItem value="ship now">Ready to ship</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="courier-label">Courier</InputLabel>
                    <Select
                        labelId="courier-label"
                        id="courier"
                        value={localFilterCourier}
                        onChange={handleCourierChange}
                        label="Courier"
                    >
                        <MenuItem value="all" selected>All</MenuItem>
                        <MenuItem value="yto">YTO</MenuItem>
                        <MenuItem value="yunda">Yunda Express</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setFilterStatus("all");
                    setFilterCourier("all");
                    onReset();
                }}>Reset</Button>
                <Button onClick={onSubmit} variant="contained" color="primary">Filter</Button>
            </DialogActions>
        </Dialog>
    );
};


export default ParcelMainPage;