import Header from "../../../third-party/layouts/dashboard/header";
import {
    Box,
    Card,
    Container,
    Tab,
    TableCell,
    TableRow,
    Tabs,
    Typography,
    Stack,
    IconButton,
    MenuItem, Avatar, Divider
} from "@mui/material";
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../../third-party/layouts/dashboard/Main";
import SearchBar from "../../../components/searchBar";
import {useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import {users as defaultUsers} from "../../../sampleData/user";
import Table from "@mui/material/Table";
import {
    emptyRows,
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

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const TABLE_HEAD = [
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'role', label: 'Role', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: '' },
];

export default function UsersList() {

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

    const [users, setUsers] = useState(defaultUsers);

    // nav bar
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [filterStatus, setFilterStatus] = useState('all');

    const handleFilterStatus = (event, newValue) => {
        setFilterStatus(newValue);
    };

    // Table row
    const [openConfirm, setOpenConfirm] = useState(false);

    const [openPopover, setOpenPopover] = useState(null);

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

    const denseHeight = dense ? 52 : 72;

    const isNotFound = !users.length;

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
                            Users List
                        </Typography>
                    </Container>

                    <Container maxWidth={false}>
                        <Card>
                            <Tabs
                                value={filterStatus}
                                onChange={handleFilterStatus}
                                sx={{
                                    px: 2,
                                    bgcolor: 'background.neutral',
                                }}
                            >
                                {STATUS_OPTIONS.map((tab) => (
                                    <Tab key={tab} label={tab} value={tab} />
                                ))}
                            </Tabs>

                            <Divider />

                            <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
                                {/*---Search Bar---*/}
                                <SearchBar
                                    width={360}
                                    height={53}
                                    searchText="Search by User Name"
                                />
                            </Container>

                            {/*---Table---*/}
                            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                                <Table size={'medium'} sx={{ minWidth: 800 }}>
                                    <TableHeadCustom
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={users.length}
                                        onSort={onSort}
                                    />

                                    <TableBody>
                                        {users
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => (
                                                <>
                                                    <TableRow hover>
                                                        <TableCell>
                                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                                <Avatar alt={row.name} src="https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_1.jpg" />

                                                                <Typography variant="subtitle2" noWrap>
                                                                    {row.name}
                                                                </Typography>
                                                            </Stack>
                                                        </TableCell>

                                                        <TableCell align="left">{row.email}</TableCell>

                                                        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                                                            <Label
                                                                variant="soft"
                                                                color={(row.role === 'buyer' ? 'primary' : row.role === 'merchant' ? 'info' : 'warning')}
                                                                sx={{ textTransform: 'capitalize' }}
                                                            >
                                                                {row.role}
                                                            </Label>
                                                        </TableCell>

                                                        <TableCell align="left">
                                                            <Label
                                                                variant="soft"
                                                                color={(row.status === 'banned' && 'error') || 'success'}
                                                                sx={{ textTransform: 'capitalize' }}
                                                            >
                                                                {row.status}
                                                            </Label>
                                                        </TableCell>

                                                        <TableCell align="right">
                                                            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                                                                <Iconify icon="eva:more-vertical-fill" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>

                                                    <MenuPopover
                                                        open={openPopover}
                                                        onClose={handleClosePopover}
                                                        arrow="right-top"
                                                        sx={{ width: 140 }}
                                                    >
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

                                                        <MenuItem
                                                            onClick={() => {
                                                                handleClosePopover();
                                                            }}
                                                        >
                                                            <Iconify icon="eva:edit-fill" />
                                                            Edit
                                                        </MenuItem>
                                                    </MenuPopover>
                                                </>
                                            ))}

                                        <TableEmptyRows
                                            height={denseHeight}
                                            emptyRows={emptyRows(page, rowsPerPage, users.length)}
                                        />

                                        <TableNoData isNotFound={isNotFound} />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePaginationCustom
                                count={users.length}
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