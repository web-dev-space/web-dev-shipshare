import {useState} from "react";
import Header from "../../third-party/layouts/dashboard/header/index.js"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical.js"
import Main from "../../third-party/layouts/dashboard/Main.js"
import {Container, Typography, Box} from '@mui/material';
import EnhancedTable from "./EnhancedTable.js";


const ShipmentMainPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header onOpenNav={handleOpen}/>
      {/*-------Box is the layout of the whole page-----*/}
      <Box
        sx={{
          display: {lg: 'flex'},
          minHeight: {lg: 1},
        }}
      >
        {/*--------------Navigation bar------------------*/}
        <NavVertical openNav={open} onCloseNav={handleClose}/>

        {/*--------------Main Content----------------------*/}
        <Main>
          <Container maxWidth={false}>
            <Typography variant="h3" component="h1" paragraph>
              Shipments
            </Typography>
            <EnhancedTable/>
          </Container>
        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};
export default ShipmentMainPage;