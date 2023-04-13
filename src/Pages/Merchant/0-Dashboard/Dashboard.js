import { Box, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import Main from "../../../third-party/layouts/dashboard/Main";
import Header from "../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical";
// _mock_
import {
  _ecommerceBestSalesman
} from '../../../third-party/_mock/arrays';
// components
import { useSettingsContext } from '../../../third-party/components/settings';
// sections
import {
  EcommerceBestSalesman,
  EcommerceWidgetSummary,
  EcommerceYearlySales
} from '../../../third-party/e-commerce';
import { FileGeneralDataActivity } from '../../../third-party/file';
import {Helmet} from "react-helmet";



const Dashboard = () => {
    const [open, setOpen] = useState(false);

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

                          <Grid item xs={12} md={4}>
                            <EcommerceWidgetSummary
                              title="Parcels Received"
                              percent={2.6}
                              total={765}
                              chart={{
                                colors: [theme.palette.primary.main],
                                series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <EcommerceWidgetSummary
                              title="Shipments Sent"
                              percent={-0.1}
                              total={18765}
                              chart={{
                                colors: [theme.palette.info.main],
                                series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <EcommerceWidgetSummary
                              title="Total Revenue"
                              percent={0.6}
                              total={4876}
                              chart={{
                                colors: [theme.palette.warning.main],
                                series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} md={6} lg={6}>
                            <FileGeneralDataActivity
                              title="Shipment Activity"
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
                                      { name: 'Air Standard', data: [20, 34, 48, 65, 37, 48] },
                                      { name: 'Air Sensitive', data: [10, 34, 13, 26, 27, 28] },
                                      { name: 'Sea Standard', data: [10, 14, 13, 16, 17, 18] },
                                      { name: 'Sea Sensitive', data: [5, 12, 6, 7, 8, 9] },
                                    ],
                                  },
                                  {
                                    type: 'Month',
                                    data: [
                                      { name: 'Air Standard', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                                      { name: 'Air Sensitive', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                                      { name: 'Sea Standard', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                                      { name: 'Sea Sensitive', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                                    ],
                                  },
                                ],
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} md={6} lg={6}>
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
                          </Grid>


                          <Grid item xs={12} md={6} lg={6}>
                            <EcommerceBestSalesman
                              title="Top Group Leaders (Forming Groups)"
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
                              title="Top Buyers (Joining Groups)"
                              tableData={_ecommerceBestSalesman}
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