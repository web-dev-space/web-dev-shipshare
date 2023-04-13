import React, { useState } from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import { Container, Typography, Box, Button } from '@mui/material';

const content =
  {
    subtitle: "This tutorial consists of six steps. \nLet's walk through how to use our service step by step.",
    imageSource: require('../../../images/tutorial.png')
  };


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
          <Container maxWidth='md'>
            <Typography variant="h3" component="h1" paragraph>
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
                    variant="contained" color="primary" style={{width: 200, height: 40, borderRadius: 20}} href="./tutorial/pages"
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