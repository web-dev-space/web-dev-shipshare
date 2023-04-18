import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack } from '@mui/material';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { getProduct, addToCart, gotoStep } from '../../redux/slices/product';
// routes
// import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../../../third-party/components/iconify';
import CustomBreadcrumbs from '../../../../third-party/components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../third-party/components/settings';
import { SkeletonProductDetails } from '../../../../third-party/components/skeleton';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsCarousel,
} from '../../../../third-party/e-commerce/details';
import CartWidget from '../../../../third-party/e-commerce/CartWidget';
import Header from "../../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../../../third-party/layouts/dashboard/Main"


// ----------------------------------------------------------------------



export default function ProductDetails() {
  const { themeStretch } = useSettingsContext();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { name } = useParams();

  const [currentTab, setCurrentTab] = useState('description');

  const product = {
      id : 1,
      name : "Product Name",
      sizes : ["S", "M", "L", "XL"],
      price : 100,
      cover : "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      status: 'sale',
      colors: ['green', 'blue', 'gray'],
      available : true,
      priceSale : 50,
      totalRating : 5,
      totalReview : 5,
      inventoryType : "in_stock",
      images:["https://images.unsplash.com/photo-1681483476977-322d81693e41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1681433803589-cb603ab7a96b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"]
  }

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
          <Container maxWidth="none">
      {/*<Container maxWidth={themeStretch ? false : 'lg'}>*/}

          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={7}>
                <ProductDetailsCarousel product={product} />
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <ProductDetailsSummary
                  product={product}
                  // cart={checkout.cart}
                  // onAddCart={handleAddCart}
                  // onGotoStep={handleGotoStep}
                />
              </Grid>
            </Grid>
            </>
          </Container>
        </Main>
      </Box>

    </>
  );
}
