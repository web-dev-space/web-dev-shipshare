import { useState } from "react";
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
import {parcelData} from "../../../sampleData/parcels";
import ReactImagePickerEditor, { ImagePickerConf } from 'react-image-picker-editor';
import 'react-image-picker-editor/dist/index.css'
import './parcel-main.css';



const ParcelMainPage = () => {

    // nav bar
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    // search bar
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log(tableData);
        setTableData(
            originalData.filter((val) => {
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

    // Add parcel dialog
    const [openAddParcel, setOpenAddParcel] = useState(false);
    const handleOpenAddParcel = () => {
        setOpenAddParcel(true);
    }
    const handleCloseAddParcel = () => {
        setOpenAddParcel(false);
    }

    // Filter dialog
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
        setTableData(
            originalData.filter((val) => {
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
        handleCloseFilter();
    }

    // table data
    const originalData = parcelData;
    const [tableData, setTableData] = useState(originalData);

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
                            <TwoSmallButtonGroup
                                leftText="Add New"
                                rightText="Filter"
                                onLeftClick={handleOpenAddParcel}
                                onRightClick={handleOpenFilter}
                            />
                        </Box>
                        <AddParcelDialog open={openAddParcel} onClose={handleCloseAddParcel} />
                        <FilterDialog open={openFilter} onClose={handleCloseFilter}
                                        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                                        filterCourier={filterCourier} setFilterCourier={setFilterCourier}
                                        onSubmitFilter={handleFilter}
                        />
                    </Container>

                    {/*---Table---*/}
                    <Container maxWidth={false}>
                    <ParcelTable data={tableData} />

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

const AddParcelDialog = ({ open, onClose }) => {

    const [name, setName] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [courier, setCourier] = useState('');
    const [image, setImage] = useState('');

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
    // const initialImage: string = '/assets/images/8ptAya.webp';
    const initialImage = '';

    const handleSubmit = () => {
        // ...
        console.log({ name, trackingNumber, courier });
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
                        imageChanged={(newDataUri: any) => { setImage(newDataUri) }} />
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
    const handleStatusChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const handleCourierChange = (event) => {
        setFilterCourier(event.target.value);
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
                        value={filterStatus}
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
                        value={filterCourier}
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
                    onSubmitFilter();
                }}>Reset</Button>
                <Button onClick={onSubmitFilter} variant="contained" color="primary">Filter</Button>
            </DialogActions>
        </Dialog>
    );
};


export default ParcelMainPage;