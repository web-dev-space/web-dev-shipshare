import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import { Box, Button, Container, Typography } from '@mui/material';
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const steps = ['', '', '', '', '', ''];
const content = [
  {
    title: "Ship to the Warehouse",
    subtitle: "Shop online and have them shipped to our warehouse address. \nBe sure to include the warehouse address as the shipping address for your package.",
    imageSource: require('../../../images/shiptothewarehouse.png')
  },
  {
    title: "Add Parcels",
    subtitle: "Once your package has been shipped, \n" +
      "you will receive a tracking number.\n" +
      "Fill in the tracking number in My Parcels page to keep track of your package.",
    imageSource: require('../../../images/addparcels.png')
  },
  {
    title: "Track Parcels",
    subtitle: "Stay updated on your parcel’s location and delivery status in My Parcels. \nOnce your package arrives at our warehouse, we'll weigh it and provide you with its weight information.",
    imageSource: require('../../../images/trackparcels.png')
  },
  {
    title: "Join or Create a Group",
    subtitle: "Choose a group which destination is close to you and fits your preferred shipping method (such as air or sea, standard or sensitive line). \nIf there is no suitable group available, you can create your own.",
    imageSource: require('../../../images/joinorcreateagroup.png')
  },
  {
    title: "Add Parcels to the Group",
    subtitle:
      "After joining a group, you can select which of your packages that have arrived at our warehouse to add to the group, and pay for the total weight. " +
      "Once payment is confirmed, we will prepare the package for shipment.",
    imageSource: require('../../../images/AddParcelsToTheGroup.png')
  },
  {
    title: "Pick Up Your Parcels",
    subtitle: "You can track the group shipment in real time on the Shipments page. \nOnce the group shipment arrives, you will be notified to pick up your package from the group leader's location.",
    imageSource: require('../../../images/pickupyourparcels.png')
  },
]


const TutorialPages = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const [screenNumber, setScreenNumber] = useState(0);
  const pageCount = 6;
  const handleNextPageClick = () => {
    if(screenNumber === 5) {
      navigate("/home");
    }
    if (screenNumber < pageCount) {
      setScreenNumber(screenNumber + 1);
    }
  };

  const handleBack = () => {
    setScreenNumber((prevActiveStep) => prevActiveStep - 1);
  };


  return (
    <>
      <Helmet>
        <title>Tutorials | ShipShare</title>
      </Helmet>

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
          <Container maxWidth='md'>
            <Typography variant="h4" component="h1" paragraph>
              Tutorials
            </Typography>

            <Stepper
              activeStep={screenNumber}
              sx={{
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                justifyContent: 'center',
                mb: 5,
              }}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative',}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative',}}>
                <img
                  src={content[screenNumber].imageSource}
                  style={{alignSelf: 'center'}}
                  alt="mainPhoto"/>
                <div >
                  <Typography sx={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 22,
                  }}>{content[screenNumber].title}</Typography>
                  <Typography sx={{marginTop: 7, justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: "gray", fontSize: 16, marginBottom:20,
                  }}>
                    {content[screenNumber].subtitle}
                  </Typography>
                </div>
              </div>

            </div>
          </Container>

          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, ml: 10, mr: 10}}>
            {/*---back button---*/}
            <Button
              color="inherit"
              onClick={handleBack}
              sx={{mr: 1}}
            >
              {screenNumber === 0 ? '' : 'Back'}
            </Button>
            <Box sx={{flex: '1 1 auto'}}/>

            {/*---next button---*/}
            <Button
              type='submit'
              onClick={handleNextPageClick}
            >
              {screenNumber === steps.length - 1 ? 'Go Back Home' : 'Next'}
            </Button>
          </Box>

        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};
export default TutorialPages;