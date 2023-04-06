import { useState } from "react";
import Header from "../../third-party/layouts/dashboard/header"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../third-party/layouts/dashboard/Main"
import { Container, Typography, Box } from '@mui/material';

import { InputBase, IconButton, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import SearchBar from "../../components/searchBar";
import TwoSmallButtonGroup from "../../components/TwoSmallButtonGroup";


const ParcelMainPage = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // search bar
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // search logic
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // table

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
                        <Typography variant="h3" component="h1" paragraph>
                            My Parcels
                        </Typography>
                    </Container>

                    <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/*---Search Bar---*/}
                        <SearchBar
                            width={360}
                            height={53}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleSearch={handleSearch}
                            handleInputChange={handleInputChange}
                            handleKeyPress={handleKeyPress}
                        />

                        {/*---button group---*/}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TwoSmallButtonGroup
                                leftText="Add New"
                                rightText="Filter"
                                onLeftClick={() => {}}
                                onRightClick={() => {}}
                            />
                        </Box>
                    </Container>

                    {/*---Table---*/}
                    <Container maxWidth={false}>


                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};
export default ParcelMainPage;