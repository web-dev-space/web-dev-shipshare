import { useSettingsContext } from '@mui-library/components/settings';
import { EcommerceWidgetSummary } from '@mui-library/e-commerce';
import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import { Box, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCommonPart from 'components/DashboardCommonPart';
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { getStatsMerchantThunk } from 'redux/dashboard/dashboard-thunks';

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

  const getIncreasePercent = (yValues) => {
    const y = yValues || [];
    if (y.length < 2) {
      return 0;
    }

    const last = y[y.length - 1];
    const lastSecond = y[y.length - 2];
    if (lastSecond === 0) {
      return 0;
    }
    return (last - lastSecond) / lastSecond * 100;
  };

  const recentParcelActivity = useMemo(() => {
    return stats?.recentParcelActivity || [];
  }, [stats]);

  const recentShipGroupActivity = useMemo(() => {
    return stats?.recentShipGroupActivity || [];
  }, [stats]);

  const recentShipGroupShippedActivity = useMemo(() => {
    return stats?.recentShipGroupShippedActivity || [];
  }, [stats]);

  const parcelFormPercent = useMemo(() =>
    getIncreasePercent(recentParcelActivity?.yValues)
    , [recentParcelActivity]);

  const groupFormPercent = useMemo(() =>
    getIncreasePercent(recentShipGroupActivity?.yValues)
    , [recentShipGroupActivity]);

  const groupShippedPercent = useMemo(() =>
    getIncreasePercent(recentShipGroupShippedActivity?.yValues)
    , [recentShipGroupShippedActivity]);

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
                    percent={parcelFormPercent}
                    total={stats?.totalParcelsNumber === undefined ? 0 : stats?.totalParcelsNumber}
                    chart={{
                      colors: [theme.palette.primary.main],
                      series: recentParcelActivity.yValues || [],
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
                    percent={groupShippedPercent}
                    total={stats?.totalGroupShipped === undefined ? 0 : stats?.totalGroupShipped}
                    chart={{
                      colors: [theme.palette.info.main],
                      series: recentShipGroupShippedActivity.yValues || [],
                    }}
                  />
                </Grid>

                {/* force the next grid to be on a new line */}
                <Grid item xs={12}></Grid>

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
