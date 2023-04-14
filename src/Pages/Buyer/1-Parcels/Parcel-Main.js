import { useState, useEffect, useCallback } from "react";
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
    MenuItem,
    DialogActions, Button, DialogContentText, FormControl, InputLabel, Select
} from '@mui/material';

import SearchBar from "../../../components/searchBar";
import TwoSmallButtonGroup from "../../../components/TwoSmallButtonGroup";
import ParcelTable from "./parcel-components/ParcelTable";
import {useDispatch, useSelector} from "react-redux";
import {createParcelThunk, findAllParcelsThunk, updateParcelThunk} from "../../../redux/parcels/parcels-thunks";
import MerchantParcelTable from "../../Merchant/1-Parcels/MerchantParcelTable";
import './parcel-main.css';
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import FormProvider, {RHFSelect, RHFTextField, RHFUploadAvatar} from "../../../third-party/components/hook-form";
import {fData} from "../../../third-party/utils/formatNumber";
import Stack from "@mui/material/Stack";
import {Helmet} from "react-helmet";



const ParcelMainPage = () => {

    // ---------nav bar---------
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // ---------current user---------
    let currentUser = useSelector(state => state.auth.currentUser);
    if (currentUser === null) {
        currentUser = {
            role: "visitor"
        }
    }

    // ---------search bar---------
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
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
            user: currentUser.email,
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
    const { parcels, loading } = useSelector((state) => {
        return state.parcels
    });

    useEffect(() => {
        dispatch(findAllParcelsThunk());
    }, [])

    // Table data
    const [tableData, setTableData] = useState(parcels);
    useEffect(() => {
        if (parcels) {
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
        }
    }, [parcels, filterCourier, filterStatus])

    // ---------Update parcel---------
    const handleUpdateParcel = (props) => {
        const newParcel = {
            _id: props._id,
            weight: props.weight,
            isWeighted: props.isWeighted,
        }
        dispatch(updateParcelThunk(newParcel));
    }

    return (
        <>
            <Helmet>
                <title>Parcels | ShipShare</title>
            </Helmet>
            {/*--------------Header------------------*/}
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
                                currentUser.role === "admin" || currentUser.role === "merchant" ?
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ height: '48px' }}
                                        onClick={handleOpenFilter}
                                        startIcon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.60826 13.8274H3.35767" stroke="#80B213" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M10.9504 5.75023H16.201" stroke="#80B213" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.27183 5.70521C7.27183 4.6255 6.39002 3.75 5.30254 3.75C4.21505 3.75 3.33325 4.6255 3.33325 5.70521C3.33325 6.78492 4.21505 7.66042 5.30254 7.66042C6.39002 7.66042 7.27183 6.78492 7.27183 5.70521Z" stroke="#80B213" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6666 13.7946C16.6666 12.7149 15.7855 11.8394 14.698 11.8394C13.6098 11.8394 12.728 12.7149 12.728 13.7946C12.728 14.8743 13.6098 15.7498 14.698 15.7498C15.7855 15.7498 16.6666 14.8743 16.6666 13.7946Z" stroke="#80B213" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>}
                                    >
                                        Filter
                                    </Button>
                                    : <TwoSmallButtonGroup
                                        leftText="Add New"
                                        rightText="Filter"
                                        onLeftClick={handleOpenAddParcel}
                                        onRightClick={handleOpenFilter}
                                    />
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
                        { currentUser.role === "merchant" || currentUser.role === "admin" ?
                            <MerchantParcelTable data={tableData}
                                                 handleUpdateParcel={handleUpdateParcel} />
                            : <ParcelTable data={tableData} />}


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

    const defaultValues = {
        name: '',
        trackingNumber: '',
        courier: '',
        picture: null,
    };
    // validation schema
    const NewParcelSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        trackingNumber: Yup.string().required('Tracking Number is required'),
        courier: Yup.string().required('courier is required'),
    });

    const methods = useForm({
        resolver: yupResolver(NewParcelSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting }
    } = methods;

    // ---- handle the file upload component ---
    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('picture', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    const onSubmit = (data) => {
        // ...
        handleAddNewParcel(data);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add A New Parcel</DialogTitle>
            <DialogContent>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    {/*-------------- 3. Upload Banner Picture -----------------*/}
                    <RHFUploadAvatar
                        name="picture"
                        maxSize={3145728}
                        onDrop={handleDrop}
                        helperText={
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 2,
                                    mx: 'auto',
                                    display: 'block',
                                    textAlign: 'center',
                                    color: 'text.secondary',
                                }}
                            >
                                Allowed *.jpeg, *.jpg, *.png, *.gif
                                <br /> max size of {fData(3145728)}
                            </Typography>
                        }
                    />
                    <RHFTextField name="name" label="Name" sx={{mt: 2}}/>
                    <RHFTextField name="trackingNumber" label="Tracking Number" sx={{mt: 2}}/>

                    <RHFSelect native name="courier" label="Courier" placeholder="Courier" sx={{mt: 2}}>
                        <option value="" />
                        {couriers.map((courier) => (
                            <option key={courier.key} value={courier.value}>
                                {courier.label}
                            </option>
                        ))}
                    </RHFSelect>

                    {/*-------------- Submit Button -----------------*/}
                    <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2}}
                           display="flex" justifyContent="flex-end">
                        <Button
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            type={"submit"}
                        >
                            Save
                        </Button>
                    </Stack>
                </FormProvider>
            </DialogContent>
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