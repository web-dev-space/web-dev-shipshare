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
import useDebugWhenChange from 'utils/useDebugWhenChange';

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

  const recentShipGroupActivity = stats?.recentShipGroupActivity || [];

  const groupFormPercent = useMemo(() => {
    const y = recentShipGroupActivity?.yValues || [];
    if (y.length < 2) {
      return 0;
    }

    const last = y[y.length - 1];
    const lastSecond = y[y.length - 2];
    console.log(last, lastSecond);
    if (lastSecond === 0) {
      return 0;
    }
    return (last - lastSecond) / lastSecond * 100;

  }, [recentShipGroupActivity]);

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

                <Grid item xs={12} md={6} xl={4}>
                  <EcommerceWidgetSummary
                    title="Parcels Received"
                    percent={7.8}
                    total={stats?.totalParcelsNumber === undefined ? 0 : stats?.totalParcelsNumber}
                    chart={{
                      colors: [theme.palette.primary.main],
                      series: [22, 8, 35, 42, 32, 84, 77, 52],
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6} xl={4}>
                  <EcommerceWidgetSummary
                    title="Group Formed"
                    percent={groupFormPercent}
                    total={stats?.totalShipGroupsNumber === undefined ? 0 : stats?.totalShipGroupsNumber}
                    chart={{
                      colors: [theme.palette.warning.main],
                      series: recentShipGroupActivity?.yValues || [],
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6} xl={4}>
                  <EcommerceWidgetSummary
                    title="Shipments Sent"
                    percent={13.2}
                    total={stats?.totalGroupShipped === undefined ? 0 : stats?.totalGroupShipped}
                    chart={{
                      colors: [theme.palette.info.main],
                      series: [21, 32, 12, 24, 18, 45],
                    }}
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
