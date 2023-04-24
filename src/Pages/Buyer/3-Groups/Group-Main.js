import Iconify from "@mui-library/components/iconify";
import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TuneIcon from '@mui/icons-material/Tune';
import { Pagination } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl, InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import OrangeChipGroup from "components/OrangeChipGroup";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  findAllShipGroupsThunk,
  findShipGroupByIdThunk
} from "redux/shipGroups/shipGroups-thunks";
import { findAllUsersThunk } from "redux/users/users-thunks";
import { getRandomAvatar } from "utils/getRandomAvatar";
import { ALL_STATES, stateFullNameToAbbr } from "./allStates";


const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'joinDate';
const DEFAULT_ROWS_PER_PAGE = 5;


const headCells = [
  {id: 'name', numeric: false, disablePadding: true, label: 'Group Name', sortable: true},
  {id: 'shipRoute', numeric: false, disablePadding: false, label: 'Route', sortable: true},
  {id: 'shipEndDate', numeric: false, disablePadding: false, label: 'End Date', sortable: true},
  {id: 'pickupLocation', numeric: false, disablePadding: false, label: 'Pick Up At', sortable: true},
  {id: 'Distance', numeric: false, disablePadding: false, label: 'Distance', sortable: true},
  {id: 'actions', numeric: false, disablePadding: false, label: 'Action', sortable: false},
  {id: 'more', numeric: false, disablePadding: false, label: '', sortable: false},
];


// ---------------------------------------Page-------------------------------------------------------
const GroupMainPage = () => {

  const dispatch = useDispatch();
  const shipGroups = useSelector((state) => {
    return state.shipGroup.shipGroups
  });

  const {users, loading} = useSelector((state) => state.users);

  // const setShipGroups = (shipGroups) => dispatch(setShipGroups(shipGroups));


  useEffect(() => {
    dispatch(findAllShipGroupsThunk());
    dispatch(findAllUsersThunk());
  }, []);

  // table data
  const [originalData, setOriginalData] = useState(shipGroups);

  // get user distance
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    console.log("getting user location...");
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
      console.log("using cached user location...");
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setUserLocation(userLocation);
        localStorage.setItem("userLocation", JSON.stringify(userLocation));
        console.log("setting user location...");
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    navigate("./")
  }, [userLocation]);

  function toRad(value) {
    return value * Math.PI / 180;
  }

  function calculateDistance(userLocation, destinationAddress) {
    let destinationLocation = {
      latitude: destinationAddress.geoLatitude,
      longitude: destinationAddress.geoLongitude
    };

    let earthRadius = 6371;
    let latDistance = toRad(destinationLocation.latitude - userLocation.latitude);
    let lngDistance = toRad(destinationLocation.longitude - userLocation.longitude);
    let a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
      + Math.cos(toRad(userLocation.latitude)) * Math.cos(toRad(destinationLocation.latitude))
      * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = earthRadius * c;
    distance = distance.toFixed(1);
    return distance;
  }

  useEffect(() => {
    const calculateDistances = () => {
      const newData = shipGroups.map(obj => {
        const distance = calculateDistance(userLocation, obj.pickupLocation);
        return {...obj, distance};
      }).filter((group) => {
        const groupDate = new Date(group.shipEndDate);
        const today = new Date();
        return groupDate >= today;
      });

      setTableData(newData);
      setOriginalData(newData)
      console.log('tableData', tableData)
      console.log("originData", originalData)
    };

    if (userLocation) {
      calculateDistances();
    }
  }, [shipGroups, userLocation]);


  function getShortAddress(address) {
    const addressParts = address.split(', ');
    const cityState = addressParts.slice(-3, -1);
    const state = cityState[1].substring(0, 2);
    return `${cityState[0]}, ${state}`;
  }


  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Filter
  const [filter, setFilter] = useState('All');
  const [focusChip, setFocusChip] = useState('All');
  const chipLabelsArray = ["All", "Air Standard", "Air Sensitive", "Sea Standard", "Sea Sensitive"];


  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [filteredData, setFilteredData] = useState(originalData)
  const [tableData, setTableData] = useState(filteredData);
  const [filterEndIn, setFilterEndIn] = useState("All");
  const [filterState, setFilterState] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = tableData.slice(startIndex, endIndex);
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  // chip filter
  useEffect(() => {
    const newFilteredRows = filteredData.filter(
      (row) => focusChip === 'All' || focusChip === row.shipRoute
    );
    setTableData(newFilteredRows);
  }, [focusChip]);

  useEffect(() => {
    setTableData(filteredData);
  }, [filteredData]);

  useEffect(() => {
    setFilteredData(originalData)
  }, [originalData]);

  useEffect(() => {
    setPage(1)
    setRows(
      originalData.filter((row) => row.shipRoute === filter || filter === "All")
    );
  }, [originalData, filter]);

  const handleResetFilter = () => {
    setFilterState("All");
    setFilterEndIn("All");
    setTableData(originalData);
    setFilteredData(originalData);
    setFocusChip("All");
    handleCloseFilter();
  }

  useEffect(() => {
    handleResetFilter();
  }, []);

  useEffect(() => {
    let rowsOnMount = stableSort(
      tableData,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );
    setTableData(rowsOnMount)
  }, []);


  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
      console.log("sorting table" + toggledOrder + " " + newOrderBy);
      console.log("tableData: ", tableData);
      const sortedRows = stableSort(tableData, getComparator(toggledOrder, newOrderBy));
      console.log("sortedRows: ", sortedRows);
      setTableData(sortedRows);
      // setVisibleRows(sortedRows);
    },
    [tableData, order, orderBy, page, rowsPerPage],
  );

  const handleNextPageClick = () => {
    if (page < pageCount) {
      setPage(page + 1);
    }
  };

  const handleFilter = () => {
    setFilteredData(
      originalData.filter((val) => {

        const endDate = new Date(val.shipEndDate);
        const today = new Date();
        const diffInMs = endDate.getTime() - today.getTime();
        const diffInDays = Math.ceil(diffInMs / 86400000);

        if (filterState === "All" && filterEndIn === "All") {
          setTableData(originalData);
          return val;
        } else if (filterState !== "All" && filterEndIn !== 'All') {
          return stateFullNameToAbbr[filterState] === getShortAddress(val.pickupLocation.address).slice(-2) &&
            (diffInDays <= filterEndIn && diffInDays > 0);
        } else if (filterState !== "All" && filterEndIn === "All") {
          return stateFullNameToAbbr[filterState] === getShortAddress(val.pickupLocation.address).slice(-2);
        } else {
          return diffInDays <= filterEndIn && diffInDays > 0;
        }
      })
    )
    setFocusChip("All");
    setTableData(filteredData);
    handleCloseFilter();
  }

  function formatDate(dateString) {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return formattedDate;
  }

  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.currentUser);

  const handleFormNewGroup = () => {
    navigate('./form-new-group');
  }

  const handleClickJoinGroup = (row) => {
    let groupId = row._id
    dispatch(findShipGroupByIdThunk(groupId));
    navigate('./checkout?groupId=' + groupId);
  }

  const handleClickGroupDetail = (row) => {
    let groupId = row._id
    navigate('./group-details?groupId=' + groupId);
  }

  const getGroupAvatar = (group) => {
    const groupLead = users.find((user) => {
      return user.email === group.leader
    })
    if (groupLead !== undefined) {
      return groupLead.avatar || getRandomAvatar(groupLead.name)
    } else {
      return null
    }
  }

  const [isPhoneScreen, setIsPhoneScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneScreen(window.innerWidth < 962);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Groups | ShipShare</title>
      </Helmet>
      <Header onOpenNav={handleOpen}/>
      {/*-------Box is the layout of the whole page-----*/}
      <Box
        sx={{
          display: {lg: 'flex'},
          minHeight: {lg: 1},
        }}
      >
        {/*--------------Navigation bar------------------*/}
        <NavVertical openNav={open} onCloseNav={handleClose}/>

        {/*--------------Main Content----------------------*/}
        <Main>
          <Container maxWidth={false}>
            <Typography variant="h4" component="h1" paragraph>
              Ongoing Groups
            </Typography>
            <Stack
              mt={3}
              mb={3}
              direction={isPhoneScreen ? "column" : "row"}
              sx={{justifyContent: 'space-between', width: '100%'}}
            >
              <Stack direction="row" spacing={2}>
                <OrangeChipGroup
                  chipLabelsArray={chipLabelsArray}
                  setFilter={setFilter}
                  focusChip={focusChip}
                  setFocusChip={setFocusChip}
                  isPhoneScreen={isPhoneScreen}
                />
              </Stack>

              <Stack direction="row"
                     spacing={2} sx={{mt: isPhoneScreen ? 1 : 0, display: "flex", justifyContent: "flex-end"}}
              >
                {currentUser && <Button
                  variant="contained"
                  size={isPhoneScreen ? "small" : "large"}
                  color='primary'
                  startIcon={<Iconify icon="eva:plus-fill"/>}
                  onClick={handleFormNewGroup}
                >
                  Form New
                </Button>}
                <Button
                  variant="outlined"
                  size={isPhoneScreen ? "small" : "large"}
                  startIcon={<TuneIcon/>}
                  onClick={handleOpenFilter}
                >Filters</Button>
                <FilterDialog open={openFilter} onClose={handleCloseFilter}
                              filterEndIn={filterEndIn} setFilterEndIn={setFilterEndIn}
                              filterState={filterState} setFilterState={setFilterState}
                              onSubmitFilter={handleFilter}
                              onResetFilter={handleResetFilter}
                />
              </Stack>
            </Stack>


            {/*-----------------Table-------------------*/}
            <>

              <TableContainer>
                <Table sx={{width: '100%'}}>

                  {/*table head*/}
                  <MyTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    currentUser={currentUser}
                  />

                  {/*table body*/}
                  {displayedItems.map((row, index) => (


                    <>
                      {row.distance && (
                        <TableBody>
                          <TableRow
                            key={row.id}
                            style={{
                              borderTop: '1px solid #EDF2F7',
                              borderBottom: '1px solid #EDF2F7',
                            }}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                          >
                            <TableCell>
                              <Box
                                sx={{
                                  alignItems: 'center',
                                  display: 'flex',
                                }}
                              >
                                <Avatar
                                  src={getGroupAvatar(row)}
                                  alt={row.name}
                                  sx={{width: 60, height: 60, borderRadius: 2}}
                                />
                                <Box sx={{ml: 2}}>
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                  >
                                    {row.name}
                                  </Typography>
                                  <Typography
                                    variant="subtitle3"
                                    noWrap
                                    sx={{color: 'text.secondary'}}
                                  >
                                    {row.members.length} members
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  alignItems: 'center',
                                  display: 'flex',
                                }}
                              >
                                {row.shipRoute === "Air Standard" &&
                                  <svg style={{paddingRight: 4}} width="19" height="18" viewBox="0 0 26 19" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M6.00002 18.8334C5.0278 18.8334 4.20141 18.4931 3.52085 17.8126C2.8403 17.132 2.50002 16.3056 2.50002 15.3334H0.166687V2.50008C0.166687 1.85841 0.395354 1.3093 0.852687 0.852748C1.30924 0.395415 1.85835 0.166748 2.50002 0.166748H18.8334V4.83342H22.3334L25.8334 9.50008V15.3334H23.5C23.5 16.3056 23.1597 17.132 22.4792 17.8126C21.7986 18.4931 20.9722 18.8334 20 18.8334C19.0278 18.8334 18.2014 18.4931 17.5209 17.8126C16.8403 17.132 16.5 16.3056 16.5 15.3334H9.50002C9.50002 16.3056 9.15974 17.132 8.47919 17.8126C7.79863 18.4931 6.97224 18.8334 6.00002 18.8334ZM6.00002 16.5001C6.33058 16.5001 6.60785 16.3881 6.83185 16.1641C7.05508 15.9409 7.16669 15.664 7.16669 15.3334C7.16669 15.0029 7.05508 14.726 6.83185 14.5027C6.60785 14.2787 6.33058 14.1667 6.00002 14.1667C5.66947 14.1667 5.39219 14.2787 5.16819 14.5027C4.94497 14.726 4.83335 15.0029 4.83335 15.3334C4.83335 15.664 4.94497 15.9409 5.16819 16.1641C5.39219 16.3881 5.66947 16.5001 6.00002 16.5001ZM20 16.5001C20.3306 16.5001 20.6075 16.3881 20.8307 16.1641C21.0547 15.9409 21.1667 15.664 21.1667 15.3334C21.1667 15.0029 21.0547 14.726 20.8307 14.5027C20.6075 14.2787 20.3306 14.1667 20 14.1667C19.6695 14.1667 19.3926 14.2787 19.1694 14.5027C18.9454 14.726 18.8334 15.0029 18.8334 15.3334C18.8334 15.664 18.9454 15.9409 19.1694 16.1641C19.3926 16.3881 19.6695 16.5001 20 16.5001ZM18.8334 10.6667H23.7917L21.1667 7.16675H18.8334V10.6667Z"
                                      fill="#EEBD5E"/>
                                  </svg>
                                }
                                {row.shipRoute === "Air Sensitive" &&
                                  <svg style={{paddingRight: 4}} width="19" height="18" viewBox="0 0 26 22" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M24.7 14.8H25.35C25.7075 14.8 26 15.0925 26 15.45V16.75C26 17.1075 25.7075 17.4 25.35 17.4H23.4C23.4 19.5531 21.6531 21.3 19.5 21.3C17.3469 21.3 15.6 19.5531 15.6 17.4H10.4C10.4 19.5531 8.65313 21.3 6.5 21.3C4.34688 21.3 2.6 19.5531 2.6 17.4V12.2H8.775C8.95375 12.2 9.1 12.0537 9.1 11.875V11.225C9.1 11.0462 8.95375 10.9 8.775 10.9H0.325C0.14625 10.9 0 10.7537 0 10.575V9.925C0 9.74625 0.14625 9.6 0.325 9.6H10.075C10.2538 9.6 10.4 9.45375 10.4 9.275V8.625C10.4 8.44625 10.2538 8.3 10.075 8.3H1.625C1.44625 8.3 1.3 8.15375 1.3 7.975V7.325C1.3 7.14625 1.44625 7 1.625 7H11.375C11.5538 7 11.7 6.85375 11.7 6.675V6.025C11.7 5.84625 11.5538 5.7 11.375 5.7H0.325C0.14625 5.7 0 5.55375 0 5.375V4.725C0 4.54625 0.14625 4.4 0.325 4.4H2.6V2.45C2.6 1.37344 3.47344 0.5 4.55 0.5H14.95C16.0266 0.5 16.9 1.37344 16.9 2.45V4.4H18.6916C19.2075 4.4 19.7031 4.60719 20.0688 4.97281L24.1272 9.03125C24.4928 9.39687 24.7 9.8925 24.7 10.4084V14.8ZM4.54949 17.4C4.54949 18.4766 5.42293 19.35 6.49949 19.35C7.57606 19.35 8.44949 18.4766 8.44949 17.4C8.44949 16.3234 7.57606 15.45 6.49949 15.45C5.42293 15.45 4.54949 16.3234 4.54949 17.4ZM17.5495 17.4C17.5495 18.4766 18.4229 19.35 19.4995 19.35C20.5761 19.35 21.4495 18.4766 21.4495 17.4C21.4495 16.3234 20.5761 15.45 19.4995 15.45C18.4229 15.45 17.5495 16.3234 17.5495 17.4ZM16.8995 10.9H22.7495V10.4084L18.6911 6.35H16.8995V10.9Z"
                                          fill="#EEBD5E"/>
                                  </svg>
                                }
                                {row.shipRoute === "Sea Standard" &&
                                  <svg style={{paddingRight: 4}} width="19" height="18" viewBox="0 0 24 24" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M23.1391 22.0499L21.5891 20.8999C20.3391 19.9499 18.3391 19.9499 17.0391 20.8999L16.7891 21.0999C16.1891 21.5499 15.1891 21.5499 14.5891 21.0999L13.8891 20.5499C12.6391 19.5999 10.6391 19.5999 9.33914 20.5499L9.03914 20.7499C8.43914 21.1999 7.43914 21.1999 6.83914 20.7499C5.58914 19.7999 3.58914 19.7999 2.28914 20.7499L0.43914 22.2499C-0.0108595 22.5999 -0.0608595 23.1999 0.239141 23.5999C0.43914 23.8499 0.739141 23.9999 1.03914 23.9999C1.23914 23.9999 1.43914 23.9499 1.63914 23.7999L3.53914 22.3499C4.13914 21.8999 5.13914 21.8999 5.73914 22.3499C6.98914 23.2999 8.98914 23.2999 10.2891 22.3499L10.5891 22.1499C11.1891 21.6999 12.1891 21.6999 12.7891 22.1499L13.4891 22.6999C14.7391 23.6499 16.7391 23.6499 18.0391 22.6999L18.3391 22.4999C18.9391 22.0499 19.9391 22.0499 20.5391 22.4999L22.0891 23.6499C22.5391 23.9999 23.1391 23.8999 23.4391 23.4499C23.6891 22.9999 23.5891 22.3999 23.1391 22.0499Z"
                                      fill="#EEBD5E"/>
                                    <path
                                      d="M12.1891 4.4L20.7391 7.1L19.9391 1.35C19.8891 0.85 19.4391 0.5 18.9891 0.5H4.58911C4.08911 0.5 3.68911 0.85 3.63911 1.35L2.83911 7.15L11.6391 4.45C11.7891 4.35 11.9891 4.35 12.1891 4.4Z"
                                      fill="#EEBD5E"/>
                                    <path
                                      d="M1.03909 19.9C1.23909 19.9 1.43909 19.85 1.63909 19.7L3.48909 18.25C4.08909 17.8 5.08909 17.8 5.68909 18.25C6.93909 19.2 8.93909 19.2 10.2391 18.25L10.5391 18.05C11.1391 17.6 12.1391 17.6 12.7391 18.05L13.4391 18.6C14.6891 19.55 16.6891 19.55 17.9891 18.6L18.2891 18.4C18.8891 17.95 19.8891 17.95 20.4891 18.4L22.0391 19.55C22.4891 19.9 23.0891 19.8 23.3891 19.35C23.7391 18.9 23.6391 18.3 23.1891 18L21.6391 16.85C20.3891 15.9 18.3891 15.9 17.0891 16.85L16.7891 17C16.1891 17.45 15.1891 17.45 14.5891 17L13.8891 16.45C12.6391 15.5 10.6391 15.5 9.33909 16.45L9.03909 16.65C8.43909 17.1 7.43909 17.1 6.83909 16.65C5.58909 15.7 3.58909 15.7 2.28909 16.65L0.389092 18.1C-0.0609083 18.45 -0.110908 19.05 0.189092 19.45C0.439092 19.75 0.739092 19.9 1.03909 19.9Z"
                                      fill="#EEBD5E"/>
                                    <path
                                      d="M4.58909 14.0001C5.83909 14.0001 6.98909 14.3501 7.93909 15.0501L8.13909 14.9001C8.98909 14.2501 10.0891 13.8501 11.1891 13.8001V7.9001V6.6001L0.939087 9.8001L3.08909 14.2001C3.58909 14.0501 4.08909 14.0001 4.58909 14.0001Z"
                                      fill="#EEBD5E"/>
                                    <path
                                      d="M13.1891 7.9V14C13.8891 14.2 14.5391 14.5 15.0891 14.9L15.6891 15.35L15.8891 15.2C16.8391 14.5 18.0891 14.1 19.3391 14.1C19.7391 14.1 20.1391 14.15 20.4891 14.2L22.6391 9.75L13.1891 6.75V7.9Z"
                                      fill="#EEBD5E"/>
                                  </svg>
                                }
                                {row.shipRoute === "Sea Sensitive" &&
                                  <svg style={{paddingRight: 4}} width="19" height="18" viewBox="0 0 23 16" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M1.08335 9.06266C0.73075 9.06266 0.402073 9.2411 0.209927 9.53673C0.0177846 9.83235 -0.0117394 10.2052 0.131469 10.5274L2.2148 15.2148C2.38199 15.5911 2.75503 15.8335 3.16669 15.8335H20.3542C20.8025 15.8335 21.2006 15.5466 21.3424 15.1212L22.9049 10.4337C23.0107 10.1161 22.9575 9.76693 22.7617 9.49527C22.566 9.2236 22.2515 9.06266 21.9167 9.06266H1.08335Z"
                                          fill="#EEBD5E"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M5.25002 11.146C4.67473 11.146 4.20835 10.6796 4.20835 10.1043V6.4585C4.20835 5.88318 4.67473 5.41683 5.25002 5.41683H19.8334C20.4087 5.41683 20.875 5.88318 20.875 6.4585V10.1043C20.875 10.6796 20.4087 11.146 19.8334 11.146H5.25002Z"
                                          fill="#EEBD5E"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M9.41669 6.4585C9.41669 7.03381 9.88304 7.50016 10.4584 7.50016H17.75C18.3253 7.50016 18.7917 7.03381 18.7917 6.4585V2.81266C18.7917 2.23737 18.3253 1.771 17.75 1.771H10.4584C9.88304 1.771 9.41669 2.23737 9.41669 2.81266V6.4585ZM11.5 5.41683V3.85433H16.7084V5.41683H11.5Z"
                                          fill="#EEBD5E"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M17.75 0.208496V2.81266H15.6667V0.208496H17.75ZM14.625 0.208496V2.81266H12.5417V0.208496H14.625Z"
                                          fill="#EEBD5E"/>
                                  </svg>
                                }
                                <Typography
                                  variant="body"
                                  sx={{
                                    color: 'rgb(238, 189, 94)',
                                  }}
                                >
                                  {row.shipRoute}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body"
                              >
                                {formatDate(row.shipEndDate)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body"
                              >
                                {getShortAddress(row.pickupLocation.address)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {row.distance ? (
                                <Typography variant="body">
                                  {row.distance} Mi
                                </Typography>
                              ) : (
                                <Typography variant="body">Loading...</Typography>
                              )}
                            </TableCell>

                            <TableCell>
                              {currentUser && <Button variant="contained"
                                                      sx={{
                                                        color: 'white',
                                                        borderRadius: 5,
                                                        backgroundColor: '80B213',
                                                        height: 45,
                                                      }}
                                                      onClick={() => handleClickJoinGroup(row)}
                              >
                                Join
                              </Button>}
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => handleClickGroupDetail(row)}
                                sx={{borderRadius: 5, backgroundColor: 'white', height: 45,}}
                              >
                                <MoreHorizIcon/></Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}

                      {
                        (!row.distance && index === 2) && (
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={6}>
                                <Stack
                                  spacing={4}
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    pt: 2,
                                  }}
                                >
                                  <svg width="150" height="150" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke="#80B213">
                                      <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite"
                                               from="0" to="502"/>
                                      <animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite"
                                               values="150.6 100.4;1 250;150.6 100.4"/>
                                    </circle>
                                  </svg>
                                  <Typography>
                                    Loading...
                                  </Typography>

                                </Stack>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        )
                      }
                    </>
                  ))}
                </Table>
              </TableContainer>
            </>
          </Container>
          {displayedItems.map((row, index) => (
            <>
              {(row.distance && index === 0) &&
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(event, value) => {
                    setPage(value)
                  }}
                  onNext={handleNextPageClick}
                  size='medium'
                  showFirstButton
                  showLastButton
                  sx={{
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%',
                  }}
                />
              }
            </>
          ))
          }
        </Main>
      </Box>
    </>
  );
};

const FilterDialog = ({
                        open, onClose, onSubmitFilter, onResetFilter,
                        filterEndIn, setFilterEndIn,
                        filterState:
                          filterState, setFilterState:
    setFilterState
                      }) => {
  const handleEndInChange = (event) => {
    setFilterEndIn(event.target.value);
  };

  const handleStateChange = (event) => {
    setFilterState(event.target.value);
  };

  const state = [{key: "All", value: "All"}, ...ALL_STATES];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <DialogContentText style={{marginBottom: 16}}>
          Please select the filter options below.
        </DialogContentText>
        <FormControl fullWidth margin="dense">
          <InputLabel id="end-in-label">End In</InputLabel>
          <Select
            labelId="end-in-label"
            id="end-in"
            value={filterEndIn}
            onChange={handleEndInChange}
            label="End In"
          >
            <MenuItem value="All" selected>All</MenuItem>
            <MenuItem value={7}>7 days</MenuItem>
            <MenuItem value={15}>15 days</MenuItem>
            <MenuItem value={30}>30 days</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            id="state"
            value={filterState}
            onChange={handleStateChange}
            label="State"
          >
            {state.map((option) => (
              <MenuItem
                key={option.key}
                value={option.key}
                selected={option.key === 'All' ? true : false}
              >
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setFilterEndIn("All");
            setFilterState("All");
            onResetFilter();
          }}>Reset</Button>
        <Button
          onClick={onSubmitFilter}
          variant="contained"
          color="primary"
        >Filter</Button>
      </DialogActions>
    </Dialog>
  );
};


function MyTableHead(props) {
  const {order, orderBy, onRequestSort, currentUser} = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  const updatedHeadCells = headCells.map((headCell) => {
    if (headCell.id === 'actions') {
      return currentUser !== null ? headCell : null;
    } else {
      return headCell;
    }
  });

  return (
    <TableHead>
      <TableRow style={{borderTop: '1px solid #EDF2F7'}}>
        {updatedHeadCells.map((headCell) => (
          headCell && (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{backgroundColor: 'white'}}
            >
              {
                headCell.sortable ? <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel> : headCell.label
              }
            </TableCell>
          )
        ))}
      </TableRow>
    </TableHead>
  );
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy, userLocation) {

  function getShortAddress(address) {
    const addressParts = address.split(', ');
    const cityState = addressParts.slice(-3, -2);
    const shortAddress = cityState.join(', ');
    return shortAddress;
  }

  switch (orderBy) {
    case 'endDate':
      const dateA = new Date(a.shipEndDate);
      const dateB = new Date(b.shipEndDate);
      return parseInt(dateB.getTime().toString()) - parseInt(dateA.getTime().toString());
    case 'Distance':
      return b.distance - a.distance
    case "pickupLocation":
      return (getShortAddress(b.pickupLocation.address)).localeCompare(getShortAddress(a.pickupLocation.address))
    case "name":
      return (b.name).localeCompare(a.name)
    default:
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
  }
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


export default GroupMainPage;