import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../../third-party/layouts/dashboard/Main.js";
import Header from "../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical.js";
import EnhancedTable from "./EnhancedTable.js";
import { updateShipGroupThunk, findAllShipGroupsThunk } from "redux/shipGroups/shipGroups-thunks.js";
import {Helmet} from "react-helmet";

const ShipmentMainPage = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const shipGroups = useSelector((state) => state.shipGroup.shipGroups);
  
  const setShipGroups = (shipGroups) => {
    // TODO
  };

  useEffect(() => {
    const initShipments = () => {
      dispatch(findAllShipGroupsThunk());
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
        <Main>
          <Container maxWidth={false}>
            <Typography variant="h4" component="h1" paragraph>
              Shipments
            </Typography>
            <EnhancedTable
              shipGroups={shipGroups}
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
