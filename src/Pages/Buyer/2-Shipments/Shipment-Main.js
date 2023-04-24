import Main from "@mui-library/layouts/dashboard/Main.js";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical.js";
import { Box, Container, Typography } from "@mui/material";
import EnhancedTable from "Pages/Buyer/2-Shipments/EnhancedTable.js";
import "Pages/Buyer/2-Shipments/shipment-main.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { findAllShipGroupsThunk } from "redux/shipGroups/shipGroups-thunks.js";
import shipGroupsData from "sampleData/shipGroups";



const ShipmentMainPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.currentUser);

  const [open, setOpen] = useState(false);

  const shipGroupsForVisitor = shipGroupsData;

  const shipGroupsRedux = useSelector((state) => state.shipGroup.shipGroups);

  const shipGroups = shipGroupsRedux?.map((shipGroup) => {
    return {
      ...shipGroup,
      key: Math.random(),
    };
  }).filter((shipGroup) => shipGroup?.members?.some((member) => member === user?.email));

  const setShipGroups = (shipGroups) => {
    // TODO
  };

  // ---------current user---------
  const currentUser = useSelector(state => state.auth.currentUser || { role: "visitor" });

  useEffect(() => {
    const initShipments = () => {
      if (currentUser && currentUser !== "visitor") {
        dispatch(findAllShipGroupsThunk());
      }
    }

    initShipments();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Shipments | ShipShare</title>
      </Helmet>
      <Header onOpenNav={handleOpen} />
      {/*-------Box is the layout of the whole page-----*/}
      <Box
        sx={{
          display: { lg: "flex" },
          minHeight: { lg: 1 },
        }}
      >
        {/*--------------Navigation bar------------------*/}
        <NavVertical openNav={open} onCloseNav={handleClose} />

        {/*--------------Main Content----------------------*/}
        {
          currentUser.role === "visitor" &&
          <Typography variant="h5" style={{
            position: "absolute",
            top: "40%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: "1000"
          }}>
            Unfortunately, the parcel feature is currently unavailable while you are in visitor mode. Please <Link to="/login" style={{ color: '#80B213' }}>log in</Link> or <Link to="/signup" style={{ color: '#80B213' }}>sign up</Link> to unlock all the features of our website.
          </Typography>
        }
        <Main className={currentUser.role === "visitor" ? "visitor-mode" : ""}>
          <Container maxWidth={false}>
            <Typography variant="h4" component="h1" paragraph>
              Shipments
            </Typography>
            <EnhancedTable
              shipGroups={currentUser.role === "visitor" ? shipGroupsForVisitor : shipGroups}
              setShipGroups={setShipGroups}
            />
          </Container>
        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};
export default ShipmentMainPage;
