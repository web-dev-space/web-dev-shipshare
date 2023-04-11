import React, { useState } from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import { Container, Typography, Box } from '@mui/material';

const content = [
    {
        title: "Tutorial",
        subtitle: "This tutorial consists of six steps. \nLet's walk through how to use our service step by step.",
        imageSource: require('../../../assets/TutorialScreen/tutorial.png')
    },
    {
        title: "Ship to the Warehouse",
        subtitle: "Shop online and have them shipped to our warehouse address. \nBe sure to include the warehouse address as the shipping address for your package.",
        imageSource: require('../../../assets/TutorialScreen/shiptothewarehouse.png')
    },
    {
        title: "Add Parcels",
        subtitle: "Once your package has been shipped, \n" +
          "you will receive a tracking number.\n" +
          "Fill in the tracking number in My Parcels page to keep track of your package.",
        imageSource: require('../../../assets/images/addparcels.png')
    },
    {
        title: "Track Parcels",
        subtitle: "Stay updated on your parcel’s location and delivery status in My Parcels. \nOnce your package arrives at our warehouse, we'll weigh it and provide you with its weight information.",
        imageSource: require('../../../assets/images/trackparcels.png')
    },
    {
        title: "Join or Create a Group",
        subtitle: "Choose a group which destination is close to you and fits your preferred shipping method (such as air or sea, standard or sensitive line). \nIf there is no suitable group available, you can create your own.",
        imageSource: require('../../../assets/images/joinorcreateagroup.png')
    },
    {
        title: "Add Parcels to the Group",
        subtitle:
          "After joining a group, you can select which of your packages that have arrived at our warehouse to add to the group, and pay for the total weight. " +
          "Once payment is confirmed, we will prepare the package for shipment.",
        imageSource: require('../../../assets/images/AddParcelsToTheGroup.png')
    },
    {
        title: "Pick Up Your Parcels",
        subtitle: "You can track the group shipment in real time on the Shipments page. \nOnce the group shipment arrives, you will be notified to pick up your package from the group leader's location.",
        imageSource: require('../../../assets/images/pickupyourparcels.png')
    },
]

const Tutorials = () => {
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
                        <Typography variant="h3" component="h1" paragraph>
                            Tutorials
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
export default Tutorials;