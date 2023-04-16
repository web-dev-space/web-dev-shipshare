import { Box, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from "react";
import Main from "third-party/layouts/dashboard/Main";
import Header from "third-party/layouts/dashboard/header";
import NavVertical from "third-party/layouts/dashboard/nav/NavVertical";
// _mock_
import {
  _ecommerceBestSalesman
} from 'third-party/_mock/arrays';
// components
import { useSettingsContext } from 'third-party/components/settings';
// sections
import {
  EcommerceBestSalesman,
  EcommerceWidgetSummary,
  EcommerceYearlySales
} from 'third-party/e-commerce';
import { FileGeneralDataActivity } from 'third-party/file';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { getStatsMerchantThunk } from 'redux/dashboard/dashboard-thunks';
import DashboardCommonPart from 'components/DashboardCommonPart';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();

  useEffect(() => {
    const initStatsMerchant = () => {
      dispatch(getStatsMerchantThunk());
    }

    initStatsMerchant();
  }, []);

  const stats = useSelector(state => state.dashboard.stats);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>DashBoard | ShipShare</title>
      </Helmet>
      {/*--------------Header------------------*/}
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
          {stats !== undefined && <Container maxWidth={false}>
            <Container maxWidth={themeStretch ? false : 'xl'}>
              <Grid container spacing={3}>

                <Grid item xs={12} md={6}>
                  <EcommerceWidgetSummary
                    title="Parcels Received"
                    total={stats?.totalParcelsNumber === undefined ? 0 : stats?.totalParcelsNumber}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <EcommerceWidgetSummary
                    title="Shipments Sent"
                    total={stats?.totalShipGroupsNumber === undefined ? 0 : stats?.totalShipGroupsNumber}
                  />
                </Grid>

                <DashboardCommonPart stats={stats} />

              </Grid>
            </Container>
          </Container>}
        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};

export default Dashboard;
