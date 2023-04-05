import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import Button from '@mui/material/Button';

function createData(trackingNo, route, joinDate, pickupAt, status) {
  return {
    trackingNo,
    route,
    joinDate,
    pickupAt,
    status,
  };
}

const rows = [
  createData('YT7136320603122', 'Air Sensitive', 'Mar 12, 2023', 'San Jose', 'Arrived',),
  createData('YT7136320603122', 'Air Sensitive', 'Mar 12, 2023', 'San Francisco', 'In Shipping',),
  createData('YT7136320603122', 'Air Sensitive', 'Mar 12, 2023', 'Sunnyvale', 'Packed'),
];

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
  return order === 'desc'
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
  {id: 'trackingNo', numeric: false, disablePadding: true, label: 'Tracking No.'},
  {id: 'route', numeric: false, disablePadding: false, label: 'Route'},
  {id: 'joinDate', numeric: false, disablePadding: false, label: 'Join Date'},
  {id: 'pickupAt', numeric: false, disablePadding: false, label: 'Pickup At'},
  {id: 'status', numeric: false, disablePadding: false, label: 'Status'},
  {id: 'actions', numeric: false, disablePadding: false, label: 'Actions'},
];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'trackingNo';
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
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

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
      }}
    >
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon/>
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);

  React.useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);
  }, []);

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage],
  );

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage],
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      setPaddingHeight(0);
    },
    [order, orderBy],
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  function getStatusColor(row) {
    switch (row.status.toLowerCase()) {
      case 'arrived':
        return '#EEBD5E';
      case 'in shipping':
        return '#FFE03F';
      case 'packed':
        return '#80B213';
      case 'order placed':
        return '#1A202C';
      default:
        return '';
    }
  }

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row, index) => {
                  return (
                    <TableRow hover
                              tabIndex={-1}
                              key={row.trackingNo}
                              style={{
                                borderTop: '1px solid #EDF2F7',
                                borderBottom: '1px solid #EDF2F7',
                              }}>
                      <TableCell component="th" scope="row" padding="none">
                        {row.trackingNo}
                      </TableCell>
                      <TableCell align="left">{row.route}</TableCell>
                      <TableCell align="left">{row.joinDate}</TableCell>
                      <TableCell align="left">{row.pickupAt}</TableCell>
                      <TableCell align="left"
                                 style={{color: getStatusColor(row)}}>
                        {row.status}
                      </TableCell>
                      <TableCell align="left">
                        <Button variant="contained"
                                color='info'
                        >
                          Detail</Button>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense}/>}
        label="Dense padding"
      />
    </Box>
  );
}
