import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Grid, Container } from '@mui/material';
import { useSettingsContext } from '../../../../third-party/components/settings';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsCarousel,
} from '../../../../third-party/e-commerce/details';
import Header from "../../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../../../third-party/layouts/dashboard/Main"
import {getProductDetails} from "../../../../redux/products/products-service";


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

  const { name } = useParams();

  const [currentTab, setCurrentTab] = useState('description');

  const rawData = {
      "title": "Folgers Coffee, Classic(Medium) Roast, 51 Ounce Classic 3.1 Pound (Pack of 3)",
      "asin": "B07VS1BXZJ",
      "link": "https://www.amazon.com/Folgers-Coffee-Classic-Medium-Roast/dp/B07VS1BXZJ",

      "brand": "Folgers",
      "description": "Made from Mountain Grown beans, the worlds richest and most aromatic. Folgers Classic Roast Coffee has been The Best Part of Wakin Up for more than 150 years. Finely ground coffee, Medium Roast; Aroma seal canister; Made from Mountain Grown beans",

      "rating": 4.7,
      "ratings_total": 8022,

      "images": [
          {
              "link": "https://m.media-amazon.com/images/I/8145b-eZW9L._SL1500_.jpg",
              "variant": "MAIN"
          },
          {
              "link": "https://m.media-amazon.com/images/I/51L29e-BHLL._SL1500_.jpg",
              "variant": "PT90"
          }
      ],
  }
  //
  // const product = {
  //     id: rawData.asin,
  //     name: rawData.title,
  //     cover: rawData.images[0].link,
  //     images: rawData.images.map((image) => image.link),
  //     totalRating: rawData.rating,
  //     totalReview: rawData.ratings_total,
  //
  //     brand: rawData.brand,
  //     description: rawData.description,
  // }

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

              {loading ? <div>Loading...</div> :
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={7}>
                    <ProductDetailsCarousel product={product} />
                  </Grid>

                  <Grid item xs={12} md={6} lg={5}>
                    <ProductDetailsSummary
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
