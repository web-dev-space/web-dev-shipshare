import { useState } from "react";
import Header from "../../../@mui-library/layouts/dashboard/header"
import NavVertical from "../../../@mui-library/layouts/dashboard/nav/NavVertical"
import Main from "../../../@mui-library/layouts/dashboard/Main"
import { Container, Typography, Box } from '@mui/material';
import ChangePasswordForm from "./ChangePasswordForm.js";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Helmet} from "react-helmet";


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