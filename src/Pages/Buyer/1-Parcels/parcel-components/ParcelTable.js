import * as React from "react";
import {
  OutlinedOrangeButton,
  OriginalOrangeButton,
  DisabledOrangeButton,
} from "../../../../components/TableButtons";
import { Box, Drawer } from "@mui/material";
import "./ParcelTable.css";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Pagination } from '@mui/material';
import ParcelDetailsScreen from "./ParcelDetailsScreen";
import {useNavigate} from "react-router-dom";
import {sortParcel} from "../../../../utils/sortParcel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "date";
const DEFAULT_ROWS_PER_PAGE = 10;

// Table head cells
const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    sortable: true,
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
    sortable: true,
  },
  {
    id: "trackingNumber",
    numeric: false,
    disablePadding: true,
    label: "Tracking No.",
    sortable: true,
  },
  {
    id: "weight",
    numeric: true,
    disablePadding: false,
    label: "Weight",
    sortable: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    sortable: true,
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
    sortable: false,
  },
];
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
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
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

// Table component
const ParcelTable = ({ data, role, handleUpdateParcel }) => {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [page, setPage] = React.useState(1);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedParcel, setSelectedParcel] = React.useState({});
  const [rowBeingEdited, setRowBeingEdited] = React.useState({});
  const [newWeight, setNewWeight] = React.useState(0);
  const navigate = useNavigate();

  const handleOpen = (parcel) => {
    setSelectedParcel(parcel);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Sort rows
  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
    },
    [data, order, orderBy, page]
  );

  React.useEffect(() => {
    const changePage = () => {
      const newPage = page - 1;

      const sortedRows = sortParcel(data, order, orderBy);
      const updatedRows = sortedRows.slice(
        newPage * DEFAULT_ROWS_PER_PAGE,
        newPage * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
      );

      setVisibleRows(updatedRows);

      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * DEFAULT_ROWS_PER_PAGE - data.length)
          : 0;

      const newPaddingHeight = 53 * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    };
    changePage();
  }, [data, page, order, orderBy]);

  const PageNavigation = () => {
    // get the total number of pages
    const count = Math.ceil(data.length / DEFAULT_ROWS_PER_PAGE);

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

  // Custom No Rows Overlay
  function CustomNoRowsOverlay() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <svg
          width="180"
          height="150"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                fill="#f5f5f5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                fill="#aeb8c2"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                fill="#f5f5f7"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                fill="#dce0e6"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              fill="#dce0e6"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g fill="#fff" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Parcels</Box>
      </div>
    );
  }

  return (
    <div style={{ height: "fit-content", width: "100% ", marginTop: 24 }}>
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
            {
              visibleRows &&
                visibleRows.length > 0 &&
                visibleRows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      style={{
                        borderTop: "1px solid #EDF2F7",
                        borderBottom: "1px solid #EDF2F7",
                      }}
                    >
                      <TableCell paddingLeft="none">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={
                              row.picture ||
                              require("../../../../images/placeholder.png")
                            }
                            alt={row.name}
                            width="60"
                            height="60"
                            style={{
                              marginRight: 19,
                              borderRadius: 15,
                              objectFit: "fill",
                              objectPosition: "center",
                            }}
                          />
                          <text
                            style={{
                              fontWeight: 600,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.name}
                          </text>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }).format(new Date(row.created))}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {row.trackingNumber}
                      </TableCell>
                      <TableCell align="right">
                        {(role === 'merchant' || role === 'admin') && rowBeingEdited._id === row._id ? (
                            <TextField
                                id="outlined-basic"
                                label="Weight"
                                variant="outlined"
                                value={newWeight}
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                                onChange={(e) => setNewWeight(e.target.value)}
                                sx={{
                                  width: 100,
                                }}
                            />
                        ) : (
                            <text>{row.isWeighted ? `${row.weight} kg` : "--"}</text>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {row.isShipped ? (
                          <OutlinedOrangeButton
                            text="Shipped"
                            onClick={() => navigate("/shipments")}
                          />
                        ) : row.isWeighted ? (
                          <OriginalOrangeButton
                            text="Ship Now"
                            onClick={() => navigate("/groups")}
                          />
                        ) : (
                          <DisabledOrangeButton text="In Transit" />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <Box spacing={2} display='flex'>
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
                        {
                          (role === 'merchant' || role === 'admin') && (
                                rowBeingEdited._id === row._id ? (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{
                                          ml: 1,
                                        }}
                                        onClick={() => {
                                          let updatedRow = {...rowBeingEdited};
                                          updatedRow.weight = newWeight;
                                          updatedRow.isWeighted = updatedRow.weight !== 0;
                                          handleUpdateParcel(updatedRow);
                                          setRowBeingEdited({});
                                        }}
                                    >
                                      Done
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                          ml: 1,
                                        }}
                                        disabled={rowBeingEdited.trackingNumber && rowBeingEdited.trackingNumber !== row.trackingNumber}
                                        onClick={() => {
                                          setRowBeingEdited(row);
                                          setNewWeight(row.isWeighted ? row.weight : 0);
                                        }}
                                    >
                                      Edit
                                    </Button>
                                )
                            )
                        }
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
            }
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
        {!(visibleRows && visibleRows.length > 0) && <CustomNoRowsOverlay />}
      </TableContainer>
      <Box sx={{ mt: 4, mb: 2 }} display="flex" justifyContent="center">
        <PageNavigation />
      </Box>

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
          <ParcelDetailsScreen
            parcel={selectedParcel}
            handleClose={handleClose}
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default ParcelTable;
