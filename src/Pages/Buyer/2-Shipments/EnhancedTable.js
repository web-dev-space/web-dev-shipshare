import { ToggleButton } from "@mui/lab";
import { Drawer, Pagination, Stack } from '@mui/material';
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
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import CustomNoRowsOverlayShipments from "components/CustomNoRowsOverlayShipments";
import OrangeChipGroup from "components/OrangeChipGroup";
import ShippingDetailScreen from "components/ShipmentsDetailScreen";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { convertDateToString } from "utils/convertDateToString.js";



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const generalComparator = (order, orderBy, a, b) => {
  if (a[orderBy] === undefined && b[orderBy] === undefined) {
    return 0;
  }

  if (a[orderBy] === undefined) {
    return 1;
  }

  if (b[orderBy] === undefined) {
    return -1;
  }

  return order === "desc"
    ? descendingComparator(a, b, orderBy)
    : -descendingComparator(a, b, orderBy);

};

function getComparator(order, orderBy) {
  if (orderBy === 'status') {
    orderBy = 'phaseNumber';
  }

  return (a, b) => generalComparator(order, orderBy, a, b);
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
    label: "Route",
  },
  { id: "shipEndDate", numeric: false, disablePadding: false, label: "Ship Date" },
  {
    id: "pickupLocation",
    numeric: false,
    disablePadding: false,
    label: "Pickup At",
    disableSorting: true,
  },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions", disableSorting: true, },
];

const DEFAULT_ORDER = "desc";
const DEFAULT_ORDER_BY = "shipEndDate";
const DEFAULT_ROWS_PER_PAGE = 5;

function MyTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow style={{ borderTop: "1px solid #EDF2F7" }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ backgroundColor: "white" }}
          >
            {headCell.disableSorting ? (
              <React.Fragment>{headCell.label}</React.Fragment>
            ) : (
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
            )}
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
  "In Shipping",
  "Packed",
  "Order Placed",
  "Order Created",
];

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
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

const FilterButtons = ({ selected, setSelected }) => {
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

const convertPhaseNumberToStatus = (shipGroup) => {
  switch (shipGroup?.phaseNumber) {
    case 0:
      return "Order Created";
    case 1:
      return "Order Placed";
    case 2:
      return "Packed";
    case 3:
      return "In Shipping";
    case 4:
      return "Arrived";
    default:
      return "Ready";
  }
}

const convertStatusToPhaseNumber = (status) => {
  switch (status?.toLowerCase()) {
    case "ready":
      return 0;
    case "paid":
      return 1;
    case "packed":
      return 2;
    case "in shipping":
      return 3;
    case "arrived":
      return 4;
    default:
      return 0;
  }
}

const EnhancedTable = ({ shipGroups, setShipGroups }) => {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [page, setPage] = React.useState(1);
  // const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  // const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [filter, setFilter] = useState("All");
  const [focusChip, setFocusChip] = useState("All");
  // const originalRows = shipGroups;
  // const setOriginalRows = setShipGroups;
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [detailedShip, setDetailedShip] = useState({});


  const addStatus = (shipGroup) => {
    switch (shipGroup?.phaseNumber) {
      case 0:
        return "Order Created";
      case 1:
        return "Order Placed";
      case 2:
        return "Packed";
      case 3:
        return "In Shipping";
      case 4:
        return "Arrived";
      default:
        return "unknown";
    }
  }

  const originalRows = React.useMemo(() => {
    return shipGroups?.map((shipGroup) => {
      return {
        ...shipGroup,
        status: addStatus(shipGroup),
      }
    })
  }, [shipGroups]);


  const handleOpen = (row) => {
    setDetailedShip(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {

      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

    },
    [order, orderBy]
  );

  const visibleRows = React.useMemo(() => {
    const newPage = page - 1;

    const sortedRows = stableSort(rows, getComparator(order, orderBy));

    const updatedRows = sortedRows.slice(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );

    return updatedRows;
  }, [page, rows, rowsPerPage, order, orderBy]);

  const paddingHeight = React.useMemo(() => {
    const newPage = page - 1;

    const numEmptyRows =
      newPage > 0
        ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
        : 0;

    return 53 * numEmptyRows;
  }, [rows, page, rowsPerPage])

  useEffect(() => {
    const filterTableData = () => {
      setPage(1);
      setRows(
        originalRows.filter((row) => convertPhaseNumberToStatus(row)?.toLowerCase() === filter.toLowerCase() || filter.toLowerCase() === "all")
      );
    };
    filterTableData();
  }, [originalRows, filter]);

  function getStatusColor(row) {
    switch (convertPhaseNumberToStatus(row)?.toLowerCase()) {
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
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Box sx={{ mb: 2 }}>
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
            sx={{ minWidth: 750 }}
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

                  const cityName = row?.pickupLocation?.address?.split(",");

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.key || Math.random()}
                      style={{
                        borderTop: "1px solid #EDF2F7",
                        borderBottom: "1px solid #EDF2F7",
                      }}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        {row?.trackingNumber === undefined || row?.trackingNumber === "" ? "--" : row?.trackingNumber}
                      </TableCell>
                      <TableCell align="left">{row.shipRoute}</TableCell>
                      <TableCell align="left">{row?.shipEndDate === undefined ? "--" : convertDateToString(row?.shipEndDate)}</TableCell>
                      <TableCell align="left">{cityName?.length >= 2 ? cityName[cityName.length - 3] : cityName}</TableCell>
                      <TableCell
                        align="left"
                        style={{ color: getStatusColor(row) }}
                      >
                        {convertPhaseNumberToStatus(row)}
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
                            handleOpen(row);
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
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!(visibleRows && visibleRows.length > 0) && <CustomNoRowsOverlayShipments />}
        </TableContainer>
        <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
          <PageNavigation />
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
            padding: "53px 22px",
            width: "400px",
            outline: "none",
            m: 0,
          }}
        >
          <ShippingDetailScreen handleClose={handleClose} ship={detailedShip} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default EnhancedTable;
