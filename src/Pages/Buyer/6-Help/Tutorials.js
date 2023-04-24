import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const content =
  {
    subtitle: "This tutorial consists of six steps. \nLet's walk through how to use our service step by step.",
    imageSource: require('../../../images/tutorial.png')
  };


const Tutorials = () => {
  const [open, setOpen] = useState(false);
const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative',}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative',}}>
                <img
                  src={content.imageSource}
                  style={{alignSelf: 'center'}}
                  alt="mainPhoto"/>
                <div >
                  <Typography sx={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 22,
                  }}>{content.title}</Typography>
                  <Typography sx={{marginTop: 7, justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: "gray", fontSize: 16, marginBottom:20,
                  }}>
                    {content.subtitle}
                  </Typography>
                </div>
              </div>
              <div style={{height: 80}}>
                <Button
                    variant="contained" color="primary" style={{width: 200, height: 40, borderRadius: 20}}
                    onClick={() => {navigate('/help/tutorial/pages')}}
                  >
                    <Typography >Get started</Typography>
                </Button>
              </div>
            </div>
          </Container>

        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};
export default Tutorials;