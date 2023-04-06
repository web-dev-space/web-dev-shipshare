import * as React from "react";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import { OutlinedOrangeButton, OriginalOrangeButton, DisabledOrangeButton } from "./TableButtons";
import {OutlinedGreenButton} from "./TableButtons";
import {Pagination} from "@mui/lab";
import {useState} from "react";


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
                {params.row.name}
            </div>
        ),
    },
    {
        field: "created.$date",
        headerName: "Date",
        sortable: true,
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
        sortable: true,
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

    // pagination
    const [page, setPage] = useState(1);

    const handlePageChange = (params) => {
        setPage(params.page);
    };

    return (
        <div style={{ height: 600, width: '100% ', marginTop:24,}}>
            <DataGrid
                rows={rows} columns={columns}
                getRowId={(row) => row._id.$oid}
                sortModel={[]}
                onSortModelChange={handleSortModelChange}
                rowHeight={80}
                pagination
                page={page}
                pageSize={10}
                components={{
                    Pagination: (props) => (
                        <Pagination
                            {...props}
                            count={Math.ceil(rows.length / 10)}
                            page={page}
                            onChange={(_, value) =>
                                handlePageChange({ page: value })}
                        />
                    ),
                }}
            />
        </div>
    );
};

export default ParcelTable;
