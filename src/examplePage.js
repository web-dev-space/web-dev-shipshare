import { useState } from "react";
import Header from "./@mui-library/layouts/dashboard/header"
import NavVertical from "./@mui-library/layouts/dashboard/nav/NavVertical"
import Main from "./@mui-library/layouts/dashboard/Main"
import { Container, Typography, Box } from '@mui/material';


const ExamplePage = () => {
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
                    <Container maxWidth={false}>
                        <Typography variant="h4" component="h1" paragraph>
                            This is h3, we can set component style here
                        </Typography>

                        <Typography variant="h4" align="center" paragraph>
                            This is h4
                        </Typography>

                        <Typography variant="subtitle1" paragraph>
                            This is subtitle1
                        </Typography>

                        <Typography gutterBottom>
                            Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc,
                            vitae euismod ligula urna in dolor. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit
                            id, lorem. Phasellus blandit leo ut odio. Vestibulum ante ipsum primis in faucibus orci
                            luctus et ultrices posuere cubilia Curae; Fusce id purus. Aliquam lorem ante, dapibus in,
                            viverra quis, feugiat a, tellus. In consectetuer turpis ut velit. Aenean posuere, tortor
                            sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.
                            Vestibulum suscipit nulla quis orci. Nam commodo suscipit quam. Sed a libero.
                        </Typography>

                        <Typography>
                            Praesent ac sem eget est egestas volutpat. Phasellus viverra nulla ut metus varius
                            laoreet. Curabitur ullamcorper ultricies nisi. Ut non enim eleifend felis pretium feugiat.
                            Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Fusce vel dui. Quisque
                            libero metus, condimentum nec, tempor a, commodo mollis, magna. In enim justo, rhoncus ut,
                            imperdiet a, venenatis vitae, justo. Cras dapibus.
                        </Typography>
                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};
export default ExamplePage;