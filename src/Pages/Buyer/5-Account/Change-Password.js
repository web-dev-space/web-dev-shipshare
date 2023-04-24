import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import { Box, Container, Typography } from '@mui/material';
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import ChangePasswordForm from "./ChangePasswordForm.js";


const ChangePassword = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Get Current User
    const currentUser = useSelector((state) => state.auth.currentUser);

    return (
      <>
          <Helmet>
              <title>Change Password | ShipShare</title>
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
                  <Container maxWidth="md">
                      <Typography variant="h4" component="h1" paragraph>
                          Change Password
                      </Typography>
                    <ChangePasswordForm isEdit currentUser={currentUser}/>
                  </Container>
              </Main>
              {/*------------------------------------*/}
          </Box>
      </>
    );
};
export default ChangePassword;