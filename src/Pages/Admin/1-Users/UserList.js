import Header from "../../../third-party/layouts/dashboard/header";
import {
    Box,
    Card,
    Container,
    TableCell,
    TableRow,
    Typography,
    Stack,
    IconButton,
    MenuItem, Avatar, Divider, TextField
} from "@mui/material";
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../../third-party/layouts/dashboard/Main";
import SearchBar from "../../../components/searchBar";
import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {
    emptyRows, getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableNoData,
    TablePaginationCustom,
    useTable
} from "../../../third-party/components/table";
import TableBody from "@mui/material/TableBody";
import Iconify from "../../../third-party/components/iconify";
import MenuPopover from "../../../third-party/components/menu-popover";
import Label from "../../../third-party/components/label";
import {
    deleteUserThunk,
    findAllUsersThunk,
    updateCurrentUserThunk,
    updateUserThunk
} from "../../../redux/users/users-thunks";
import {useDispatch, useSelector} from "react-redux";
import DeleteDialog from "./DeleteDialog";
import {use} from "i18next";
import {getRandomAvatar} from "../../../utils/getRandomAvatar";

const STATUS_OPTIONS = ['all', 'active', 'banned'];
const EDITABLE_STATUS_OPTIONS = ['active', 'banned'];
const ROLE_OPTIONS = ['all', 'admin', 'buyer', 'merchant'];
const EDITABLE_ROLE_OPTIONS = ['buyer', 'merchant'];

const TABLE_HEAD = [
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'role', label: 'Role', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: '' },
];

function isBanned(user, admin) {
    if (user.email === "merchant4@test.com") {
        console.log(admin);
    }
    return admin.blockList.find((blocker) => blocker === user._id);
}

function UserRow({row, onEdit, onDelete, isEdit, setEditRow, dispatch, onActivateUser, onBanUser}) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openPopover, setOpenPopover] = useState(null);
    const [editName, setEditName] = useState(row.name);
    const [editEmail, setEditEmail] = useState(row.email);
    const [editRole, setEditRole] = useState(row.role);
    const [editStatus, setEditStatus] = useState(row.status);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const onSubmitEdit = () => {
        const newUser = {
            ...row,
            name: editName,
            email: editEmail,
            role: editRole
        };
        dispatch(updateUserThunk(newUser));
        if (editStatus !== row.status) {
            if (editStatus === 'active') {
                onActivateUser(row);
            } else {
                onBanUser(row);
            }
        }
        setEditRow(null);
    }

    return (
        <>
            <TableRow hover>
                <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={row.name}
                                src={row.avatar? row.avatar : getRandomAvatar(row.name)}
                        />

                        {
                            isEdit ? <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                size="small"
                                type="text"
                                value={editName}
                                variant="outlined"
                                onChange={(event) => setEditName(event.target.value)} /> :
                                <Typography variant="subtitle2" noWrap>
                                    {row.name}
                                </Typography>
                        }

                    </Stack>
                </TableCell>

                <TableCell align="left">{
                    isEdit ? <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        size="small"
                        type="text"
                        value={editEmail}
                        variant="outlined"
                        onChange={(event) => setEditEmail(event.target.value)} /> :
                        row.email}
                </TableCell>

                <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                    {
                        isEdit && row.role !== 'admin' ? <TextField
                            fullWidth
                            select
                            name="email"
                            size="small"
                            label="Status"
                            value={editRole}
                            onChange={(event) => setEditRole(event.target.value)}
                            SelectProps={{
                                MenuProps: {
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 260,
                                        },
                                    },
                                },
                            }}
                            sx={{
                                maxWidth: { sm: 240 },
                                textTransform: 'capitalize',
                            }}
                        >
                            {EDITABLE_ROLE_OPTIONS.map((option) => (
                                <MenuItem
                                    key={option}
                                    value={option}
                                    sx={{
                                        mx: 1,
                                        borderRadius: 0.75,
                                        typography: 'body2',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField> : <Label
                            variant="soft"
                            color={(row.role === 'buyer' ? 'primary' : row.role === 'merchant' ? 'info' : 'warning')}
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {row.role}
                        </Label>
                    }
                </TableCell>

                <TableCell align="left"> {
                    isEdit && row.role !== 'admin' ? <TextField
                        fullWidth
                        select
                        name="email"
                        size="small"
                        label="Status"
                        value={editStatus}
                        onChange={(event) => setEditStatus(event.target.value)}
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    sx: {
                                        maxHeight: 260,
                                    },
                                },
                            },
                        }}
                        sx={{
                            maxWidth: { sm: 240 },
                            textTransform: 'capitalize',
                        }}
                    >
                        {EDITABLE_STATUS_OPTIONS.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                sx={{
                                    mx: 1,
                                    borderRadius: 0.75,
                                    typography: 'body2',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </TextField> : <Label
                        variant="soft"
                        color={(row.status === 'banned' && 'error') || 'success'}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {row.status}
                    </Label>
                }
                </TableCell>

                {
                    !isEdit && <TableCell align="right">
                        <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                            <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                    </TableCell>
                }
                {
                    isEdit && <TableCell align="right">
                        <IconButton color={openPopover ? 'inherit' : 'default'} onClick={onSubmitEdit}>
                            <Iconify icon="material-symbols:done" />
                        </IconButton>
                    </TableCell>
                }

            </TableRow>

            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                arrow="right-top"
                sx={{ width: 140 }}
            >
                {
                    row.role !== 'admin' &&
                    <MenuItem
                        onClick={() => {
                            handleOpenConfirm();
                            handleClosePopover();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <Iconify icon="eva:trash-2-outline" />
                        Delete
                    </MenuItem>
                }

                <MenuItem
                    onClick={() => {
                        onEdit();
                        handleClosePopover();
                    }}
                >
                    <Iconify icon="eva:edit-fill" />
                    Edit
                </MenuItem>
            </MenuPopover>
            <DeleteDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                onDelete={onDelete}
            />
        </>);
}

export default function UserList() {

    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        onSort,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    // fetch table data
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.users);
    const { currentUser } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(findAllUsersThunk());
    }, []);

    useEffect(() => {
        setIsNotFound(!users || users.length === 0);
    }, [users]);

    // nav bar
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // filter
    const [filterName, setFilterName] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isNotFound, setIsNotFound] = useState(false);
    const [userFiltered, setUserFiltered] = useState([]);
    const [editRow, setEditRow] = useState(null);

    const handleFilterStatus = (event) => {
        setPage(0);
        setFilterStatus(event.target.value);
    };

    const handleFilterRole = (event) => {
        setPage(0)
        setFilterRole(event.target.value);
    };

    const handleInputChange = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    useEffect(() => {
        console.log(currentUser);
        const userFiltered = applyFilter({
            inputData: (users || []).map(user => ({
                ...user,
                status: isBanned(user, currentUser || {}) ? 'banned' : 'active',
            })),
            comparator: getComparator(order, orderBy),
            filterName,
            filterRole,
            filterStatus,
        });
        setUserFiltered(userFiltered);
    }, [filterName, filterRole, filterStatus, order, orderBy, users, currentUser]);

    // Table row
    const [isEdit, setIsEdit] = useState(false);


    const handleClickDelete = (row) => {
        dispatch(deleteUserThunk(row._id));
    };

    // c. edit
    const handleClickEdit = (row) => {
        setIsEdit(true);
        setEditRow(row);
        console.log('edit');
    };

    const handleActivateUser = (user) => {
        const updatedBlockList =
            currentUser.blockList.filter((email) => email !== user._id);
        dispatch(updateCurrentUserThunk({
            ...currentUser,
            blockList: updatedBlockList,
        }));
    };

    const handleBanUser = (user) => {
        dispatch(updateCurrentUserThunk({
            ...currentUser,
            blockList: [
                ...currentUser.blockList,
                user._id,
            ],
        }));
    };


    const denseHeight = dense ? 52 : 72;

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
                            User List
                        </Typography>
                    </Container>

                    <Container maxWidth={false}>

                        <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1, mb: 1, gap: 2}}>
                            {/*---Search Bar---*/}
                            <SearchBar
                                width={360}
                                height={53}
                                searchText="Search by User Name"
                                searchTerm={filterName}
                                setSearchTerm={setFilterName}
                                handleInputChange={handleInputChange}
                                borderStyle={"1px solid #919EAB"}
                            />

                            <TextField
                                fullWidth
                                select
                                label="Status"
                                value={filterStatus}
                                onChange={handleFilterStatus}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 260,
                                            },
                                        },
                                    },
                                }}
                                sx={{
                                    maxWidth: { sm: 240 },
                                    textTransform: 'capitalize',
                                }}
                            >
                                {STATUS_OPTIONS.map((option) => (
                                    <MenuItem
                                        key={option}
                                        value={option}
                                        sx={{
                                            mx: 1,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                select
                                label="Role"
                                value={filterRole}
                                onChange={handleFilterRole}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 260,
                                            },
                                        },
                                    },
                                }}
                                sx={{
                                    maxWidth: { sm: 240 },
                                    textTransform: 'capitalize',
                                }}
                            >
                                {ROLE_OPTIONS.map((option) => (
                                    <MenuItem
                                        key={option}
                                        value={option}
                                        sx={{
                                            mx: 1,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Container>

                        <Card>

                            {/*---Table---*/}
                            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                                <Table size={'medium'} sx={{ minWidth: 800 }}>
                                    <TableHeadCustom
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={userFiltered.length}
                                        onSort={onSort}
                                    />

                                    <TableBody>
                                        {userFiltered
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => <UserRow
                                                key={row._id}
                                                row={row}
                                                isEdit={editRow && (editRow._id === row._id)}
                                                onEdit={() => handleClickEdit(row)}
                                                setEditRow={setEditRow}
                                                onDelete={() => handleClickDelete(row)}
                                                onActivateUser={() => handleActivateUser(row)}
                                                onBanUser={() => handleBanUser(row)}
                                                dispatch={dispatch}
                                            />)}

                                        <TableEmptyRows
                                            height={denseHeight}
                                            emptyRows={emptyRows(page, rowsPerPage, userFiltered.length)}
                                        />

                                        <TableNoData isNotFound={isNotFound} />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePaginationCustom
                                count={userFiltered.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={onChangePage}
                                onRowsPerPageChange={onChangeRowsPerPage}
                            />
                        </Card>
                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter(
            (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    if (filterStatus !== 'all') {
        inputData = inputData.filter((user) => user.status === filterStatus);
    }

    if (filterRole !== 'all') {
        inputData = inputData.filter((user) => user.role === filterRole);
    }

    return inputData;
}