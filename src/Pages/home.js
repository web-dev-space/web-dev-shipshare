import { useState } from "react";
import Header from "../third-party/layouts/dashboard/header"
import NavVertical from "../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../third-party/layouts/dashboard/Main"
import {
    Container,
    Typography,
    Box,
} from '@mui/material';
import {useSelector} from "react-redux";


const Home = () => {

    // ---------nav bar---------
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // ---------current user---------
    let currentUser = useSelector(state => state.auth.currentUser);
    if (currentUser === null) {
        currentUser = {
            role: "visitor"
        }
    }

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
                            Home
                        </Typography>
                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};

export default Home;