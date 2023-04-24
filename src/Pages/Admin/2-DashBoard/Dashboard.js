import { AnalyticsWidgetSummary } from '@mui-library/analytics';
import { useSettingsContext } from '@mui-library/components/settings';
import { EcommerceYearlySales } from '@mui-library/e-commerce';
import { FileGeneralDataActivity } from '@mui-library/file';
import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import { Box, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCommonPart from 'components/DashboardCommonPart';
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { getStatsAdminThunk } from 'redux/dashboard/dashboard-thunks';


const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const stats = useSelector(state => state.dashboard.stats);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const { themeStretch } = useSettingsContext();

  useEffect(() => {
    const initStatsMerchant = () => {
      dispatch(getStatsAdminThunk());
    }

    initStatsMerchant();
  }, []);

  const getArrayWithDefault = (array) => {
    return array === undefined ? [] : array;
  }

  const getNumberWithDefault = (number, defaultValue = 0) => {
    return number === undefined ? defaultValue : number;
  }

  const weeklyUserRegistrationData = getArrayWithDefault(stats?.countRecentRegisterWeekly);

  const monthlyUserRegistrationData = getArrayWithDefault(stats?.countRecentRegisterMonthly);

  const timeLabels = {
    week: getArrayWithDefault(weeklyUserRegistrationData.xValues),
    month: getArrayWithDefault(monthlyUserRegistrationData.xValues),
  };

  const recentFormedShipGroupWeekly = getArrayWithDefault(stats?.recentFormedShipGroupWeekly);

  const recentFormedShipGroupMonthly = getArrayWithDefault(stats?.recentFormedShipGroupMonthly);

  const timeLabelsFormedShipGroups = {
    week: getArrayWithDefault(recentFormedShipGroupWeekly.xValues),
    month: getArrayWithDefault(recentFormedShipGroupMonthly.xValues),
  };

  const recentPostsActivity = useMemo(() => {
    return stats?.recentPostsActivity || [];
  }, [stats]);


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
          <Container maxWidth={false}>
            <Container maxWidth={themeStretch ? false : 'xl'}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={4}>
                  <AnalyticsWidgetSummary
                    title="New Users"
                    total={getNumberWithDefault(stats?.newUserCounts)}
                    icon="mdi:user"
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <AnalyticsWidgetSummary
                    title="Parcel Received"
                    total={getNumberWithDefault(stats?.totalParcelsNumber)}
                    color="warning"
                    icon="tabler:package-export"
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <AnalyticsWidgetSummary
                    title="Shipments Sent"
                    total={getNumberWithDefault(stats?.totalShipGroupsNumber)}
                    color="error"
                    icon="fluent-mdl2:join-online-meeting"
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <FileGeneralDataActivity
                    title="New User Registration"
                    chart={{
                      labels: timeLabels,
                      colors: [
                        '#00b8d7'
                      ],
                      series: [
                        {
                          type: 'Week',
                          data: [
                            { name: 'new users', data: weeklyUserRegistrationData?.yValues },
                          ],
                        },
                        {
                          type: 'Month',
                          data: [
                            { name: 'new users', data: monthlyUserRegistrationData.yValues },
                          ],
                        },
                      ],
                    }}
                    style={{ height: '455px' }}
                  />
                </Grid>

                {/* <Grid item xs={12} md={6} lg={6}>
                  <FileGeneralDataActivity
                    title="New ShipGroup Formed"
                    chart={{
                      labels: timeLabelsFormedShipGroups,
                      colors: [
                        theme.palette.success.main,
                      ],
                      series: [
                        {
                          type: 'Week',
                          data: [
                            { name: 'new users', data: recentFormedShipGroupWeekly?.yValues },
                          ],
                        },
                        {
                          type: 'Month',
                          data: [
                            { name: 'new users', data: recentFormedShipGroupMonthly.yValues },
                          ],
                        },
                      ],
                    }}
                    style={{ height: '455px' }}
                  />
                </Grid> */}

                <Grid item xs={12} md={6} lg={6}>
                  <EcommerceYearlySales
                    title="Post Activity"
                    chart={{
                      categories: recentPostsActivity.xValues || [],
                      series: [
                        {
                          year: 'Week',
                          data: [
                            { name: 'Posts', data: recentPostsActivity.yValues || [] },
                          ],
                        },
                      ],
                    }}
                    style={{ height: '455px' }}
                    defaultSeries="Week"
                  />
                </Grid>

                <DashboardCommonPart stats={stats} />

              </Grid>
            </Container>
          </Container>
        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};

export default Dashboard;
