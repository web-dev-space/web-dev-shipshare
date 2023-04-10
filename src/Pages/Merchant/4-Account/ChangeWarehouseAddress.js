import { useState } from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import { Container, Typography, Box} from '@mui/material';
import WarehouseAddressForm from "./WarehouseAddressForm";


const ChangeWarehouse = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let currentAddress = {
        receiver: "John",
        street: "1234 Main St",
        city: "Guangzhou",
        province: "Guangdong",
        phoneNumber: "13800001234",
    };

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
                        <Typography variant="h4" paragraph>
                            Change Warehouse Address
                        </Typography>

                        <WarehouseAddressForm currentAddress={currentAddress} />
                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};
export default ChangeWarehouse;