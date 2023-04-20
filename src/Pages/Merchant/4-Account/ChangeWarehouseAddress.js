import {useEffect, useState} from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import {Box, Container, Typography} from '@mui/material';
import WarehouseAddressForm from "./WarehouseAddressForm";
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import {findWarehouseByCompany} from "../../../redux/warehouse/warehouse-service";


const ChangeWarehouse = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // fetch current warehouse address (by user company)
    const [currentWarehouse, setCurrentWarehouse] = useState(null);
    const currentUser = useSelector((state) => state.auth.currentUser);
    let company = "";
    if (currentUser.role === "admin") {
        company = "ShipShare Official";
    }
    else {
        company = currentUser.company;
    }

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                const warehouses = await findWarehouseByCompany(company);
                setCurrentWarehouse(warehouses[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchWarehouse().then(r => r);
    }, [company]);

    return (
        <>
            <Helmet>
                <title>Warehouse Address | ShipShare</title>
            </Helmet>
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
                    <Container maxWidth="md">
                        <Typography variant="h3" component="h1" paragraph>
                            Change Warehouse Address
                        </Typography>
                        {currentWarehouse && (
                        <WarehouseAddressForm currentAddress={currentWarehouse}/>
                        )}
                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};
export default ChangeWarehouse;