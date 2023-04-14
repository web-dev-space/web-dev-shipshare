import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../../third-party/layouts/dashboard/Main.js";
import Header from "../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical.js";
import EnhancedTable from "./EnhancedTable.js";
import { updateShipGroupThunk, findAllShipGroupsThunk } from "redux/shipGroups/shipGroups-thunks.js";
import {Helmet} from "react-helmet";
import shipGroupsData from "../../../sampleData/shipGroups";
import "./shipment-main.css";
import {Link} from "react-router-dom";

const ShipmentMainPage = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const shipGroupsForVisitor = shipGroupsData;

  const shipGroups = useSelector((state) => state.shipGroup.shipGroups);
  
  const setShipGroups = (shipGroups) => {
    // TODO
  };

  // ---------current user---------
  const currentUser = useSelector(state => state.auth.currentUser || {role: "visitor"});

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
