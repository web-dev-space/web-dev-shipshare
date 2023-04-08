import * as React from "react";
import {
    DataGrid,
    GridColDef,
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector
} from "@mui/x-data-grid";
import { OutlinedOrangeButton, OriginalOrangeButton, DisabledOrangeButton } from "../../../components/TableButtons";
import {OutlinedGreenButton} from "../../../components/TableButtons";
import {Box, TablePaginationProps, Typography} from "@mui/material";
import MuiPagination from '@mui/material/Pagination';
import './ParcelTable.css';


// Column definitions
const columns: GridColDef[] = [
    {
        field: "name",
        headerName: "Name",
        sortable: true,
        width: 240,
        renderCell: (params) => (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={params.row.picture}
                     alt={params.row.name}
                     width="60" height="60"
                     style={{ marginRight: 19, borderRadius:15,
                         objectFit: 'fill',
                         objectPosition: 'center',}} />
                <text style={{ fontWeight: 600, maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis'}}>{params.row.name}</text>
            </div>
        ),
    },
    {
        field: "created.$date",
        headerName: "Date",
        sortable: false,
        width: 180,
        renderCell: (params) =>
            new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(params.row.created.$date)),
    },
    { field: "trackingNumber",
        headerName: "Tracking No.",
        sortable: true,
        width: 180 },
    {
        field: "weight",
        headerName: "Weight",
        sortable: false,
        width: 120,
        renderCell: (params) => (params.row.isWeighted ? `${params.row.weight} lbs` : "--"),
    },
    {
        field: "isShipped",
        headerName: "Status",
        sortable: false,
        width: 160,
        renderCell: (params) =>
            params.row.isShipped ? (
                <OutlinedOrangeButton text="Shipped" onClick={() => console.log("Shipped")} />
            ) : params.row.isWeighted ? (
                <OriginalOrangeButton text="Ship Now" onClick={() => console.log("Ship Now")} />
            ) : (
                <DisabledOrangeButton text="In Transit" />
            ),
    },
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        filterable: false,
        width: 120,
        renderCell: (params) =>
            <OutlinedGreenButton
                text="Detail" onClick={() => console.log("Detail")}
            />,
    },
];

// Table component
const ParcelTable = ({ data }) => {
    const [rows, setRows] = React.useState(data);
    React.useEffect(() => {setRows(data)}, [data]);
    // Sort rows
    const handleSortModelChange = (model) => {
        const sortedRows = [...rows].sort((a, b) => {
            let cmp = 0;
            model.forEach(({ field, sort }) => {
                const v1 = a[field];
                const v2 = b[field];
                if (cmp === 0 && sort) {
                    cmp = (v1 > v2 ? 1 : v1 < v2 ? -1 : 0) * (sort === "asc" ? 1 : -1);
                }
            });
            return cmp;
        });
        setRows(sortedRows);
    };

    // Custom Pagination
    function Pagination({
                            page,
                            onPageChange,
                            className,
                        }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
        const apiRef = useGridApiContext();
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);

        return (
            <MuiPagination
                color="primary"
                className={className}
                count={pageCount}
                page={page + 1}
                onChange={(event, newPage) => {
                    onPageChange(event, newPage - 1);
                }}
            />
        );
    }

    function CustomPagination(props: any) {
        return <GridPagination rowsPerPage={<div></div>} ActionsComponent={Pagination} {...props} />;
    }

    // Custom No Rows Overlay
    function CustomNoRowsOverlay() {
        return (
            <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
            }}>
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
                                fill= '#f5f5f5'
                                cx="67.797"
                                cy="106.89"
                                rx="67.797"
                                ry="12.668"
                            />
                            <path
                                fill='#aeb8c2'
                                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                            />
                            <path
                                fill='#f5f5f7'
                                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                            />
                            <path
                                fill='#dce0e6'
                                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                            />
                        </g>
                        <path
                            fill='#dce0e6'
                            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                        />
                        <g fill='#fff' transform="translate(149.65 15.383)">
                            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                        </g>
                    </g>
                </svg>
                <Box sx={{ mt: 1 }}>
                    No Parcels
                </Box>
            </div>
        );
    }

    return (
        <div style={{ height: 600, width: '100% ', marginTop:24,}}>
            <DataGrid
                rows={rows} columns={columns}
                getRowId={(row) => row._id.$oid}
                sortModel={[]}
                onSortModelChange={handleSortModelChange}
                rowHeight={80}
                pagination
                classes={{withBorderColor: {borderColor: 'black'}}}
                hideFooterRowCount
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                className="custom-datagrid custom-footer"
                slots={{
                    pagination: CustomPagination,
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
            />
        </div>
    );
};

export default ParcelTable;
