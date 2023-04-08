import React, {useEffect, useState} from "react";
import Header from "../../third-party/layouts/dashboard/header"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../third-party/layouts/dashboard/Main"
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  TableContainer,
  Tooltip,
  IconButton,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  TableHead,
  Table,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText, FormControl, InputLabel, Select, MenuItem, DialogActions
} from '@mui/material';
import Iconify from "../../third-party/components/iconify";
import Scrollbar from "../../third-party/components/scrollbar";
import {Icon} from "@iconify/react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Pagination} from "@mui/lab";
import TuneIcon from '@mui/icons-material/Tune';
import OrangeChipGroup from "../../components/OrangeChipGroup";
import {shipments} from "../../sampleData/shipments";
import Checkout from "../3-Groups/Checkout";
import {Link} from "react-router-dom";
import TableSortLabel from "@mui/material/TableSortLabel";
import {visuallyHidden} from "@mui/utils";
import {ALL_STATES, stateFullNameToAbbr} from "./allStates";


const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'joinDate';
const DEFAULT_ROWS_PER_PAGE = 5;


const headCells = [
  {id: 'name', numeric: false, disablePadding: true, label: 'Group Name'},
  {id: 'route', numeric: false, disablePadding: false, label: 'Route'},
  {id: 'endDate', numeric: false, disablePadding: false, label: 'End Date'},
  {id: 'pickUpAt', numeric: false, disablePadding: false, label: 'Pick Up At'},
  {id: 'Distance', numeric: false, disablePadding: false, label: 'Distance'},
  {id: 'actions', numeric: false, disablePadding: false, label: 'actions'},
];

function MyTableHead(props) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow style={{borderTop: '1px solid #EDF2F7'}}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{backgroundColor: 'white'}}
          >
            <TableSortLabel
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
            </TableSortLabel>
          </TableCell>
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

function descendingComparator(a, b, orderBy) {
  console.log("a", a);
  console.log("orderBy", orderBy);
  console.log("a[orderBy]", a[orderBy]);
  console.log("b[orderBy]", b[orderBy]);

  if (b[orderBy] < a[orderBy]) {
    console.log("-1")
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    console.log("1")
    return 1;
  }
  console.log("0")
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


// ----------------------------------------------------------------------------------------------
const GroupMainPage = () => {
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

  // table data
  const originalData = shipments;

  function createData(id, memberCount, name, route, endDate, pickUpAt) {
    return {id, memberCount, name, route, endDate, pickUpAt};
  }

  const originalRows = originalData.map((shipment) => {
    return createData(shipment.id, shipment.members.length, shipment.name, shipment.shipRoute, shipment.shipEndDate, shipment.pickupLocation.shortAddress);
  });

// chip filter
  useEffect(() => {
    const newFilteredRows = filteredData.filter(
      (row) => focusChip === 'All' || focusChip.includes(row.route)
    );
    setTableData(newFilteredRows);
  }, [focusChip]);

  // Filter dialog'../1-Parcels/parcel-components/ParcelListCard';
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [tableData, setTableData] = useState(originalRows);
  const [filterEndIn, setFilterEndIn] = useState("all");
  const [filterState, setFilterState] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = tableData.slice(startIndex, endIndex);
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [rows, setRows] = useState([]);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [filteredData, setFilteredData] = useState(originalRows)


  useEffect(() => {
    let rowsOnMount = stableSort(
      tableData,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );

    // rowsOnMount = rowsOnMount.slice(
    //   0 * DEFAULT_ROWS_PER_PAGE,
    //   0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    // );

    // console.log(rowsOnMount)
    setTableData(rowsOnMount)
    // console.log(tableData)
    // setVisibleRows(rowsOnMount);
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
      originalRows.filter((val) => {
        if (filterState === "All") {
          setTableData(originalRows);
          return val;
        } else {
          return stateFullNameToAbbr[filterState] === val.pickUpAt.slice(-2);
        }
      })
    )
    setFocusChip("All");
    setTableData(filteredData);
    handleCloseFilter();

  }

  useEffect(() => {
    setTableData(filteredData);
  }, [filteredData]);

  useEffect(() => {
    const filterTableData = () => {
      setRows(
        originalRows.filter((row) => row.status === filter || filter === "All")
      );
    };
    filterTableData();
  }, [originalRows, filter]);

  function formatDate(dateString) {
    const date = new Date(parseInt(dateString.$date.$numberLong));
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return formattedDate;
  }


  return (
    <>
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
            <Typography variant="h4">
              Ongoing Groups
            </Typography>
            <Stack
              mt={3}
              mb={3}
              direction="row"
              sx={{justifyContent: 'space-between', width: '100%'}}
            >
              <Stack direction="row" spacing={2}>
                <OrangeChipGroup
                  chipLabelsArray={chipLabelsArray}
                  setFilter={setFilter}
                  focusChip={focusChip}
                  setFocusChip={setFocusChip}
                />
              </Stack>

              <Stack direction="row"
                     spacing={2}
              >
                <Button
                  variant="contained"
                  size="large"
                  color='primary'
                  startIcon={<Iconify icon="eva:plus-fill"/>}
                  href="/groups/form-new-group"
                >
                  Form New
                </Button>
                <Button
                  // component={RouterLink}
                  // to={PATH_DASHBOARD.eCommerce.new}
                  variant="outlined"
                  size="large"
                  startIcon={<TuneIcon/>}
                  onClick={handleOpenFilter}
                >Filters</Button>
                <FilterDialog open={openFilter} onClose={handleCloseFilter}
                              filterEndIn={filterEndIn} setFilterEndIn={setFilterEndIn}
                              filterState={filterState} setFilterState={setFilterState}
                              onSubmitFilter={handleFilter}
                />
              </Stack>
            </Stack>


            {/*-----------------Table-------------------*/}
            <>
              <TableContainer>
                <Table sx={{width: '100%'}}>
                  {/*<Scrollbar>*/}
                  {/*table head*/}
                  <MyTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />

                  {/*table body*/}
                  {/*first line data*/}
                  <TableBody>
                    {displayedItems.map((row) => (
                      <TableRow
                        key={row.name}
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
                              alt="Product 1"
                              src="/static/mock-images/products/product_1.png"
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
                                {row.memberCount} members
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
                          <svg style={{paddingRight:3}} width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_1749)">
                              <path d="M5.30005 15C4.67505 15 4.1438 14.7813 3.7063 14.3438C3.2688 13.9063 3.05005 13.375 3.05005 12.75H1.55005V4.5C1.55005 4.0875 1.69705 3.7345 1.99105 3.441C2.28455 3.147 2.63755 3 3.05005 3H13.55V6H15.8L18.05 9V12.75H16.55C16.55 13.375 16.3313 13.9063 15.8938 14.3438C15.4563 14.7813 14.925 15 14.3 15C13.675 15 13.1438 14.7813 12.7063 14.3438C12.2688 13.9063 12.05 13.375 12.05 12.75H7.55005C7.55005 13.375 7.3313 13.9063 6.8938 14.3438C6.4563 14.7813 5.92505 15 5.30005 15ZM5.30005 13.5C5.51255 13.5 5.6908 13.428 5.8348 13.284C5.9783 13.1405 6.05005 12.9625 6.05005 12.75C6.05005 12.5375 5.9783 12.3595 5.8348 12.216C5.6908 12.072 5.51255 12 5.30005 12C5.08755 12 4.9093 12.072 4.7653 12.216C4.6218 12.3595 4.55005 12.5375 4.55005 12.75C4.55005 12.9625 4.6218 13.1405 4.7653 13.284C4.9093 13.428 5.08755 13.5 5.30005 13.5ZM14.3 13.5C14.5125 13.5 14.6905 13.428 14.834 13.284C14.978 13.1405 15.05 12.9625 15.05 12.75C15.05 12.5375 14.978 12.3595 14.834 12.216C14.6905 12.072 14.5125 12 14.3 12C14.0875 12 13.9095 12.072 13.766 12.216C13.622 12.3595 13.55 12.5375 13.55 12.75C13.55 12.9625 13.622 13.1405 13.766 13.284C13.9095 13.428 14.0875 13.5 14.3 13.5ZM13.55 9.75H16.7375L15.05 7.5H13.55V9.75Z" fill="#EEBD5E"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_1_1749">
                                <rect width="18" height="18" fill="white" transform="translate(0.800049)"/>
                              </clipPath>
                            </defs>
                          </svg>

                          <Typography
                            variant="body"
                            sx={{
                              color: 'rgb(238, 189, 94)',
                            }}
                          >
                            {row.route}
                          </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body"
                          >
                            {formatDate(row.endDate)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body"
                          >
                            {row.pickUpAt}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body"
                          >
                            0.5 miles
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button variant="contained"
                                  sx={{
                                    color: 'white',
                                    borderRadius: 5,
                                    backgroundColor: '80B213',
                                    height: 45,
                                  }} href="/groups/checkout">
                              Join
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            href={"/groups/group-details"}
                            sx={{borderRadius: 5, backgroundColor: 'white', height: 45,}}
                          >
                            <MoreHorizIcon/></Button>
                        </TableCell>
                      </TableRow>
                    ))}

                  </TableBody>
                  {/*</Scrollbar>*/}
                </Table>

              </TableContainer>

            </>

          </Container>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(event, value) => {
              setPage(value)
            }}
            onNext={handleNextPageClick}
            size='large'
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
        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};

const FilterDialog = ({
                        open, onClose, onSubmitFilter,
                        filterEndIn, setFilterEndIn,
                        filterState: filterState, setFilterState: setFilterState
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
            <MenuItem value="all" selected>All</MenuItem>
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
              <MenuItem key={option.key} value={option.key} selected={option.key === 'All' ? true : false}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setFilterEndIn("all");
            setFilterState("all");
            onSubmitFilter();
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


export default GroupMainPage;