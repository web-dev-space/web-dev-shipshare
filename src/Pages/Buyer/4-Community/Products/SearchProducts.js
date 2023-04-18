import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Box, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../../../third-party/components/settings';
// sections
import Header from "../../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical";
import {useState} from "react";
import Main from "../../../../third-party/layouts/dashboard/Main"
import {useSelector} from "react-redux";

// ----------------------------------------------------------------------

export default function SearchProducts() {
    const { themeStretch } = useSettingsContext();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    <Container maxWidth="none">
                        <Typography variant="h3" paragraph>
                            Search Products
                        </Typography>
                    </Container>
                </Main>
                {/*</Container>*/}
            </Box>
        </>
    );
}
