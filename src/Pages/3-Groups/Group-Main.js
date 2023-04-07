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



  useEffect(() => {
    const newFilteredRows = originalRows.filter(
      (row) => focusChip === 'All' || focusChip.includes(row.route)
    );
    setTableData(newFilteredRows);
  }, [focusChip]);

  // Filter dialog
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
  const itemsPerPage = 7;
  const pageCount = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = tableData.slice(startIndex, endIndex);

  const handleNextPageClick = () => {
    if (page < pageCount) {
      setPage(page + 1);
    }
  };

  const handleFilter = () => {

    setTableData(
      originalData.filter((val) => {

      })

    )
    handleCloseFilter();
  }

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
                >
                  Filters
                </Button>
                <FilterDialog open={openFilter} onClose={handleCloseFilter}
                              filterEndIn={filterEndIn} setFilterEndIn={setFilterEndIn}
                              filterState={filterState} setFilterState={setFilterState}
                              onSubmitFilter={handleFilter}
                />
              </Stack>
            </Stack>

            <Card>
              <TableContainer>
                <Table sx={{width: '100%'}}>
                  {/*<Scrollbar>*/}
                  {/*table head*/}
                  <TableHead
                    sx={{justifyContent: 'space-between', width: '100%'}}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Group Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Route
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          End Date
                        </Typography>

                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Pick Up At
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Distance
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Action
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  {/*table body*/}
                  {/*first line data*/}
                  <TableBody>
                    {displayedItems.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >

                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex',
                            }
                            }
                          >
                            <Avatar
                              alt="Product 1"
                              src="/static/mock-images/products/product_1.png"
                              sx={{width: 80, height: 80, borderRadius: 2}}
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
                          <Typography
                            variant="body"
                            sx={{
                              color: 'rgb(238, 189, 94)',
                            }}
                          >
                            {row.route}
                          </Typography>
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

                                  }}>
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

            </Card>

          </Container>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(event, value) => { setPage(value) }}
            onNext={handleNextPageClick}
            size='large'
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
            <MenuItem value="all" selected>All</MenuItem>
            <MenuItem value="alabama">Alabama</MenuItem>
            <MenuItem value="alaska">Alaska</MenuItem>
            <MenuItem value="arizona">Arizona</MenuItem>
            <MenuItem value="arkansas">Arkansas</MenuItem>
            <MenuItem value="california">California</MenuItem>
            <MenuItem value="colorado">Colorado</MenuItem>

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