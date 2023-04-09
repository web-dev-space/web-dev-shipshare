import { useState } from "react";
import Header from "../../third-party/layouts/dashboard/header"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../third-party/layouts/dashboard/Main"
import { Container, Typography, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// _mock_
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from '../../third-party/_mock/arrays';
// components
import { useSettingsContext } from '../../third-party/components/settings';
// sections
import {
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance,
} from '../../third-party/e-commerce';
import { FileGeneralDataActivity } from '../../third-party/file';



const Following = () => {
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
                              title="Shipment Sent"
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
                                      { name: 'Air Sensitive', data: [20, 34, 48, 65, 37, 48] },
                                      { name: 'Air Standard', data: [10, 34, 13, 26, 27, 28] },
                                      { name: 'Sea Sensitive', data: [10, 14, 13, 16, 17, 18] },
                                      { name: 'Sea Standard', data: [5, 12, 6, 7, 8, 9] },
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
                              // subheader="(+43%) than last year"
                              chart={{
                                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                                series: [
                                  {
                                    year: '2019',
                                    data: [
                                      { name: 'Total Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                                      { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                                    ],
                                  },
                                  {
                                    year: '2020',
                                    data: [
                                      { name: 'Total Income', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                                      { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                                    ],
                                  },
                                ],
                              }}
                            />
                          </Grid>


                          <Grid item xs={12} md={6} lg={6}>
                            <EcommerceBestSalesman
                              title="Group Leader"
                              tableData={_ecommerceBestSalesman}
                              tableLabels={[
                                { id: 'seller', label: 'Seller' },
                                { id: 'amount', label: 'Amount' },
                                { id: 'rank', label: 'Rank', align: 'right' },
                              ]}
                            />
                          </Grid>

                          <Grid item xs={12} md={6} lg={6}>
                            <EcommerceBestSalesman
                              title="Buyer"
                              tableData={_ecommerceBestSalesman}
                              tableLabels={[
                                { id: 'seller', label: 'Seller' },
                                { id: 'amount', label: 'Amount' },
                                { id: 'rank', label: 'Rank', align: 'right' },
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
export default Following;