import { Box, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import Main from "third-party/layouts/dashboard/Main";
import Header from "third-party/layouts/dashboard/header";
import NavVertical from "third-party/layouts/dashboard/nav/NavVertical";
// _mock_
// components
import { useSettingsContext } from 'third-party/components/settings';
// sections
import DashboardCommonPart from 'components/DashboardCommonPart';
import { Helmet } from "react-helmet";
import { AnalyticsWidgetSummary } from 'third-party/analytics';
import {
  EcommerceYearlySales
} from 'third-party/e-commerce';
import { FileGeneralDataActivity } from 'third-party/file';

import { useEffect } from "react";
// _mock_
// components
// sections
import { useSelector } from 'react-redux';
import { getStatsMerchantThunk } from 'redux/dashboard/dashboard-thunks';

import { useDispatch } from 'react-redux';


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

  const TIME_LABELS = {
    week: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    year: ['2018', '2019', '2020', '2021', '2022'],
  };

  useEffect(() => {
    const initStatsMerchant = () => {
      dispatch(getStatsMerchantThunk());
    }

    initStatsMerchant();
  }, []);


  useEffect(() => {
    const debugStats = () => {
      console.debug("stats changed", stats);
    }

    debugStats();
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
                <Grid item xs={12} sm={6} md={3}>
                  <AnalyticsWidgetSummary
                    title="New Users"
                    total={714000}
                    icon="mdi:user"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <AnalyticsWidgetSummary
                    title="Weekly Sales"
                    total={1352831}
                    color="info"
                    icon="mdi:cart-sale"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <AnalyticsWidgetSummary
                    title="Groups Formed"
                    total={1723315}
                    color="warning"
                    icon="fluent-mdl2:join-online-meeting"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <AnalyticsWidgetSummary
                    title="Shipments Sent"
                    total={234}
                    color="error"
                    icon="tabler:package-export"
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <FileGeneralDataActivity
                    title="Weekly User Registration"
                    chart={{
                      labels: TIME_LABELS,
                      colors: [
                        theme.palette.success.main,
                      ],
                      series: [
                        {
                          type: 'Week',
                          data: [
                            { name: 'Air Sensitive', data: [20, 34, 48, 65, 37, 48, 43] },
                          ],
                        },
                        {
                          type: 'Month',
                          data: [
                            { name: 'Air Sensitive', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                          ],
                        },
                        {
                          type: 'Year',
                          data: [
                            { name: 'Images', data: [10, 34, 13, 56, 77] },
                          ],
                        },
                      ],
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <EcommerceYearlySales
                    title="Weekly group formed"
                    chart={{
                      categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                      series: [
                        {
                          year: 'this week',
                          data: [
                            { name: 'Total Revenue', data: [148, 91, 69, 62, 49, 51, 35] },
                          ],
                        },
                        {
                          year: 'last week',
                          data: [
                            { name: 'Total Revenue', data: [10, 41, 35, 151, 49, 62, 69] },
                          ],
                        }
                      ],
                    }}
                  />
                </Grid>

                {/* <Grid item xs={12} md={6} lg={6}>
                  <FileGeneralDataActivity
                    title="Data Activity"
                    chart={{
                      labels: TIME_LABELS,
                      colors: [
                        theme.palette.success.main,
                        theme.palette.error.main,
                        theme.palette.info.main,
                        theme.palette.warning.main,
                      ],
                      series: [
                        {
                          type: 'Week',
                          data: [
                            { name: 'Air Sensitive', data: [20, 34, 48, 65, 37, 48, 11] },
                            { name: 'Air Standard', data: [10, 34, 13, 26, 27, 28, 42] },
                            { name: 'Sea Sensitive', data: [10, 14, 13, 16, 17, 18, 32] },
                            { name: 'Sea Standard', data: [5, 12, 6, 7, 8, 9, 5] },
                          ],
                        },
                        {
                          type: 'Month',
                          data: [
                            { name: 'Air Sensitive', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                            { name: 'Media', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                            { name: 'Documents', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                            { name: 'Other', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                          ],
                        },
                        {
                          type: 'Year',
                          data: [
                            { name: 'Images', data: [10, 34, 13, 56, 77] },
                            { name: 'Media', data: [10, 34, 13, 56, 77] },
                            { name: 'Documents', data: [10, 34, 13, 56, 77] },
                            { name: 'Other', data: [10, 34, 13, 56, 77] },
                          ],
                        },
                      ],
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <EcommerceYearlySales
                    title="Line"
                    chart={{
                      categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                      series: [
                        {
                          year: 'this week',
                          data: [
                            { name: 'Total Revenue', data: [10, 41, 35, 151, 49, 62, 69] },
                          ],
                        },
                        {
                          year: 'last week',
                          data: [
                            { name: 'Total Revenue', data: [148, 91, 69, 62, 49, 51, 35] },
                          ],
                        },
                      ],
                    }}
                  />
                </Grid>


                <Grid item xs={12} md={6} lg={6}>
                  <EcommerceBestSalesman
                    title="Best Salesman"
                    tableData={_ecommerceBestSalesman}
                    tableLabels={[
                      { id: 'groupLeader', label: 'Group Leader' },
                      { id: 'amount', label: 'Amount' },
                      { id: 'rank', label: 'Rank', align: 'right' }, //delete if not needed
                    ]}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <EcommerceBestSalesman
                    title="Best Salesman"
                    tableData={_ecommerceBestSalesman}
                    tableLabels={[
                      { id: 'buyer', label: 'Buyer' },
                      { id: 'amount', label: 'Amount' },
                      { id: 'rank', label: 'Rank', align: 'right' }, //delete if not needed
                    ]}
                  />
                </Grid> */}

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