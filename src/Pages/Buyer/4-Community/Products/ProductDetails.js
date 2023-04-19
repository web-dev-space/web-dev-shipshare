import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Grid, Container } from '@mui/material';
import { useSettingsContext } from '../../../../third-party/components/settings';
// sections
import {ProductDetailsCarousel} from '../../../../third-party/e-commerce/details';
import Header from "../../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../../../third-party/layouts/dashboard/Main"
import {getProductDetails} from "../../../../redux/products/products-service";
import ProductDetailCard from "./components/ProductDetailCard";


// ----------------------------------------------------------------------

export default function ProductDetails() {
  const { themeStretch } = useSettingsContext();

  const {productId} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductDetails(productId).then((rawData) => {
      setProduct({
          id: rawData.asin,
          name: rawData.title,
          cover: rawData.images[0].link,
          images: (rawData.images.length > 3 ?
              rawData.images.slice(0, 3) : rawData.images).map((image) => image.link),
          totalRating: rawData.rating,
          totalReview: rawData.ratings_total,

          brand: rawData.brand,
          description: rawData.description,
      });
      setLoading(false);
    });
  }, [productId]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// ----------------------------------------------------------------------
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
              {loading
                  // 这里要换个居中的loading动图
                  ? <div>Loading...</div>
                  : <>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={7}>
                        <ProductDetailsCarousel product={product} />
                      </Grid>

                      <Grid item xs={12} md={6} lg={5}>
                        <ProductDetailCard
                          product={product}
                        />
                      </Grid>
                    </Grid>
                  </>
              }
          </Container>
        </Main>
      </Box>

    </>
  );
}
