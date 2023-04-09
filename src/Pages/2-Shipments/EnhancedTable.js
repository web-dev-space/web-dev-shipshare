import {ToggleButton} from "@mui/lab";
import Pagination from "@mui/lab/Pagination";
import {Drawer, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import {ThemeProvider, createTheme, styled} from "@mui/material/styles";
import {visuallyHidden} from "@mui/utils";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import OrangeChipGroup from "../../components/OrangeChipGroup";
import ShippingDetailScreen from "./ShipmentsDetailScreen.js";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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

const headCells = [
  {
    id: "trackingNumber",
    numeric: false,
    disablePadding: true,
    label: "Tracking No.",
  },
  {
    id: "shipRoute",
    numeric: false,
    disablePadding: false,
    label: "shipRoute",
  },
  {id: "joinDate", numeric: false, disablePadding: false, label: "Join Date"},
  {
    id: "pickupLocation",
    numeric: false,
    disablePadding: false,
    label: "Pickup At",
  },
  {id: "status", numeric: false, disablePadding: false, label: "Status"},
  {id: "actions", numeric: false, disablePadding: false, label: "Actions"},
];

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "joinDate";
const DEFAULT_ROWS_PER_PAGE = 5;

function MyTableHead(props) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow style={{borderTop: "1px solid #EDF2F7"}}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{backgroundColor: "white"}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

MyTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const chipLabelsArray = [
  "All",
  "Arrived",
  "Shipping",
  "Packed",
  "Order Placed",
  "Order Created",
];

const StyledToggleButton = styled(ToggleButton)(({theme}) => ({
  "&.MuiToggleButton-root": {
    borderRadius: "25px",
    marginRight: "19px",
    padding: "8px 22px",
    color: "#CFDBD5",
  },
  "&.Mui-selected": {
    backgroundColor: "#f0bc68",
    borderColor: "#e4e8eb",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#f0bc68",
    },
    "&.Mui-disabled": {
      backgroundColor: "gray",
    },
  },
}));

const FilterButtons = ({selected, setSelected}) => {
  const handleFilterChange = (event, selectedFilter) => {
    if (selectedFilter !== null && selectedFilter !== selected) {
      setSelected(selectedFilter);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
      {chipLabelsArray.map((filter, index) => (
        <StyledToggleButton
          selected={selected === filter}
          onChange={(event) => handleFilterChange(event, filter)}
          value={filter}
          aria-label={filter}
        >
          {filter}
        </StyledToggleButton>
      ))}
    </Box>
  );
};

const EnhancedTable = ({ shipGroups, setShipGroups }) => {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [page, setPage] = React.useState(1);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [filter, setFilter] = useState("All");
  const [focusChip, setFocusChip] = useState("All");

  // const [originalRows, setOriginalRows] = React.useState([]);

  const originalRows = shipGroups;
  const setOriginalRows = setShipGroups;

  const [rows, setRows] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, [rows]);

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [rows, order, orderBy, page, rowsPerPage]
  );

  useEffect(() => {
    const changePage = () => {
      const newPage = page - 1;

      console.debug("newPage", newPage);

      console.debug("rows", rows);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      console.debug("sortedRows", sortedRows);
      console.debug("rowsPerPage", rowsPerPage);
      console.debug("page", page);

      console.debug("updatedRows", updatedRows);

      setVisibleRows(updatedRows);

      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
          : 0;

      const newPaddingHeight = 53 * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    };
    changePage();
  }, [rows, page, order, orderBy, rowsPerPage]);

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );

      setVisibleRows(updatedRows);

      setPaddingHeight(0);
    },
    [order, orderBy]
  );

  useEffect(() => {
    const filterTableData = () => {
      setRows(
        originalRows.filter((row) => row.status === filter || filter === "All")
      );
    };
    filterTableData();
  }, [originalRows, filter]);

  function getStatusColor(row) {
    switch (row?.status?.toLowerCase()) {
      case "arrived":
        return "#EEBD5E";
      case "in shipping":
        return "#FFE03F";
      case "packed":
        return "#80B213";
      case "order placed":
        return "#1A202C";
      case "order created":
        return "#A0AEC0";
      default:
        return "";
    }
  }

  const theme = createTheme({
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: "#80B213",
              color: "white",
            },
          },
        },
      },
    },
  });

  const PageNavigation = (props) => {
    // get the total number of pages
    const count = Math.ceil(rows.length / rowsPerPage);

    return (
      <ThemeProvider theme={theme}>
        <Pagination
          count={count}
          page={page}
          siblingCount={2}
          boundaryCount={1}
          onChange={(event, value) => {
            setPage(value);
          }}
          showFirstButton
          showLastButton
        />
      </ThemeProvider>
    );
  };

  return (
    <Box sx={{width: "100%"}}>
      <Paper sx={{width: "100%", mb: 2}}>
        <Box sx={{mb: 2}}>
          {/* <Tooltip title="Filter list">
            <FilterButtons selected={selected} setSelected={setSelected} />
          </Tooltip> */}
          <Stack direction="row" spacing={2}>
            <OrangeChipGroup
              chipLabelsArray={chipLabelsArray}
              setFilter={setFilter}
              focusChip={focusChip}
              setFocusChip={setFocusChip}
            />
          </Stack>
        </Box>

        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <MyTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.trackingNumber}
                      style={{
                        borderTop: "1px solid #EDF2F7",
                        borderBottom: "1px solid #EDF2F7",
                      }}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        {row.trackingNumber}
                      </TableCell>
                      <TableCell align="left">{row.shipRoute}</TableCell>
                      <TableCell align="left">{row.joinDate}</TableCell>
                      <TableCell align="left">{row.pickupLocation}</TableCell>
                      <TableCell
                        align="left"
                        style={{color: getStatusColor(row)}}
                      >
                        {row.status}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "white",
                            "&:hover": {
                              backgroundColor: "white",
                            },
                            color: "#1A202C",
                            border: "1px solid rgba(0, 90, 100, 0.35)",
                          }}
                          onClick={() => {
                            handleOpen();
                          }}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
                : null}
              {paddingHeight > 0 && (
                <TableRow
                  style={{
                    height: paddingHeight,
                  }}
                >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{mt: 2}} display="flex" justifyContent="center">
          <PageNavigation/>
        </Box>
      </Paper>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: "flex",
          alignItems: "flex-end",
          overflowY: "auto",
          flexDirection: "column",
          height: "auto",
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            // p: 4,
            padding: "53px 22px",
            width: "400px",
            outline: "none",
            m: 0,
          }}
        >
          <ShippingDetailScreen handleClose={handleClose}/>
        </Box>
      </Drawer>
    </Box>
  );
};

export default EnhancedTable;
