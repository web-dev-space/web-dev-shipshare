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
  // const topLeaders = useSelector(state => state.dashboard.topFiveLeaders);
  const topLeaders = stats?.topFiveLeaders === undefined
    ? []
    : stats?.topFiveLeaders.map((leader, index) => {
      return {
        ...leader,
        total: leader.amount,
      }
    });

  const topUsers = stats?.topFiveUsers === undefined
    ? []
    : stats?.topFiveUsers.map((user, index) => {
      return {
        ...user,
        total: user.amount,
      }
    });

  useEffect(() => {
    const debugStats = () => {
      console.debug("stats changed", stats);
    }

    debugStats();
  }, [stats]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.debug("_ecommerceBestSalesman", _ecommerceBestSalesman)
  }, [_ecommerceBestSalesman]);


  const timeLabels = useMemo(() => {
    const rotateArray = (arr, index) => {
      if (index === -1) {
        return arr;
      }
      return arr.slice(index, arr.length).concat(arr.slice(0, index));
    }

    function getLastSevenWeekDates() {
      const dates = [];
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        // Calculate past week date
        const pastWeekDate = new Date(today);
        pastWeekDate.setDate(today.getDate() - 7 * i);

        // Format the date as 'M/D'
        const formattedDate = `${pastWeekDate.getMonth() + 1}/${pastWeekDate.getDate()}`;

        // Add it to our array of dates
        dates.push(formattedDate);
      }

      return dates;
    }


    const timeLabels = {
      week: getLastSevenWeekDates(),
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      year: ['2018', '2019', '2020', '2021', '2022'],
    };

    const todayMonth = new Date().getMonth();
    timeLabels.month = rotateArray(timeLabels.month, todayMonth);

  }, []);


  const weeklyData = useMemo(() => {
    return stats?.activityWeekly === undefined ? {} : stats?.activityWeekly?.map((activity, index) => {
      return {
        name: activity.route,
        data: activity.data,
      }
    })
  }, [stats?.activityWeekly]);



  const monthlyData = useMemo(() => {
    return stats?.activityMonthly === undefined ? {} : stats?.activityMonthly?.map((activity, index) => {
      return {
        name: activity.route,
        data: activity.data,
      }
    })
  }, [stats?.activityMonthly]);

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

                <Grid item xs={12} md={6}>
                  <EcommerceWidgetSummary
                    title="Parcels Received"
                    // percent={2.6}
                    total={stats?.totalParcelsNumber === undefined ? 0 : stats?.totalParcelsNumber}
                  // chart={{
                  //   colors: [theme.palette.primary.main],
                  //   series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
                  // }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <EcommerceWidgetSummary
                    title="Shipments Sent"
                    // percent={-0.1}
                    total={stats?.totalShipGroupsNumber === undefined ? 0 : stats?.totalShipGroupsNumber}
                  // chart={{
                  //   colors: [theme.palette.info.main],
                  //   series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
                  // }}
                  />
                </Grid>

                {/* <Grid item xs={12} md={4}>
                  <EcommerceWidgetSummary
                    title="Total Revenue"
                    // percent={0.6}
                    total={0}
                  // chart={{
                  //   colors: [theme.palette.warning.main],
                  //   series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
                  // }}
                  />
                </Grid> */}

                <Grid item xs={12} md={12} lg={12}>
                  <FileGeneralDataActivity
                    title="Shipment Activity"
                    chart={{
                      labels: timeLabels,
                      colors: [
                        theme.palette.success.main,
                        theme.palette.error.main,
                        theme.palette.info.main,
                        theme.palette.warning.main,
                      ],
                      series: [
                        {
                          type: 'Week',
                          // data: [
                          //   { name: 'Air Standard', data: [20, 34, 48, 65, 37, 48] },
                          //   { name: 'Air Sensitive', data: [10, 34, 13, 26, 27, 28] },
                          //   { name: 'Sea Standard', data: [10, 14, 13, 16, 17, 18] },
                          //   { name: 'Sea Sensitive', data: [5, 12, 6, 7, 8, 9] },
                          // ],
                          data: weeklyData,
                        },
                        {
                          type: 'Month',
                          // data: [
                          //   { name: 'Air Standard', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                          //   { name: 'Air Sensitive', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                          //   { name: 'Sea Standard', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                          //   { name: 'Sea Sensitive', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                          // ],
                          data: monthlyData,
                        },
                      ],
                    }}
                  />
                </Grid>

                {/* <Grid item xs={12} md={6} lg={6}>
                  <EcommerceYearlySales
                    title="Total Revenue"
                    // subheader="(+43%) than last year"
                    chart={{
                      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
                      series: [
                        {
                          year: '2019',
                          data: [
                            { name: 'Total Revenue', data: [10, 41, 35, 151, 49, 62, 69] },
                          ],
                        },
                        {
                          year: '2020',
                          data: [
                            { name: 'Total Revenue', data: [148, 91, 69, 62, 49, 51, 35] },
                          ],
                        },
                      ],
                    }}
                  />
                </Grid> */}


                <Grid item xs={12} md={6} lg={6}>
                  <EcommerceBestSalesman
                    title="Top Group Leaders (Forming Groups)"
                    tableData={topLeaders}
                    tableLabels={[
                      { id: 'groupLeader', label: 'Group Leader' },
                      { id: 'amount', label: 'Amount' },
                      { id: 'rank', label: 'Rank', align: 'right' }, //delete if not needed
                    ]}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <EcommerceBestSalesman
                    title="Top Buyers (Joining Groups)"
                    tableData={topUsers}
                    tableLabels={[
                      { id: 'buyer', label: 'Buyer' },
                      { id: 'amount', label: 'Amount' },
                      { id: 'rank', label: 'Rank', align: 'right' }, //delete if not needed
                    ]}
                  />
                </Grid>

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