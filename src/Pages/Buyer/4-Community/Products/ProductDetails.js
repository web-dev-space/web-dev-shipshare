import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// @mui
import {
  Box,
  Grid,
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
  Pagination,
  Divider
} from '@mui/material';
import { useSettingsContext } from '../../../../third-party/components/settings';
// sections
import { ProductDetailsCarousel } from '../../../../third-party/e-commerce/details';
import Header from "../../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../../../third-party/layouts/dashboard/Main"
import { getProductDetails } from "../../../../redux/products/products-service";
import ProductDetailCard from "./components/ProductDetailCard";
import { getRandomAvatar } from "../../../../utils/getRandomAvatar";
import { reviews as sampleReviews } from "../../../../sampleData/reviews";
import { findAllUsersThunk } from "../../../../redux/users/users-thunks";
import { useDispatch, useSelector } from "react-redux";
import { findReviewsForProject } from "redux/reviews/reviews-service";
import { createReviewThunk } from "redux/reviews/reviews-thunks";
import { findReviewsForProjectThunk } from "redux/reviews/reviews-thunks";
import React from 'react';
import { Snackbar } from "@mui/material";
import { unwrapResult } from '@reduxjs/toolkit';
import {SkeletonProductDetails} from "../../../../third-party/components/skeleton";

// ----------------------------------------------------------------------
const REVIEWS_PER_PAGE = 5;

const handleClickUserIcon = (user, navigate) => {
  if (!user || !user._id) return;
  navigate(`/community/profile/${user._id}`)
};

// Comment component
const Review = ({ user, date, content }) => {

  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      alignItems: 'center',
      marginTop: 32, marginBottom: 32
    }}>
      {user &&
        <Avatar
          src={user.avatar ? user.avatar : getRandomAvatar(user.name)}
          onClick={() => { handleClickUserIcon(user, navigate) }}
          style={{ cursor: 'pointer' }}
          sx={{ width: 48, height: 48, mb: 'auto' }} />}
      <div style={{ marginLeft: 16, width: "100%" }}>
        <div style={{ display: 'flex', flexDirection: "row" }}>
          <div style={{ width: "100%" }}>
            <div style={{
              fontSize: 16,
              fontWeight: 600,
            }}>
              {user?.name}
              <div style={{
                fontSize: 13,
                color: '#929191'
              }}>
                {date && new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))}
              </div>
            </div>

          </div>
        </div>

        <div style={{
          fontSize: 14,
          marginTop: 10
        }}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default function ProductDetails() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const role = useSelector(state => state.auth.currentUser?.role);

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState('');


  const reviews = useSelector((state) => state.reviews.reviews);

  const errorReviews = useSelector((state) => state.reviews.error);

  const [openSnackbar, setOpenSnackBar] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };


  useEffect(() => {
    dispatch(findReviewsForProjectThunk(productId));
  }, []);


  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(findAllUsersThunk());
  }, []);

  async function handlePostNewReview() {
    const reviewForPost = {
      asin: productId,
      user: currentUser?._id,
      date: new Date(),
      content: newReview,
      productName: product?.name,
      productLink: product?.link,
      productImage: product?.cover,
    };

    try {
      await dispatch(createReviewThunk(reviewForPost)).then(unwrapResult);
      setNewReview('');
    } catch (e) {
      setOpenSnackBar(true);
      console.log(errorReviews);
    }

  }

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
        price: rawData.buybox_winner.price.raw,
        brand: rawData.brand,
        description: rawData.description,
        features: rawData.feature_bullets,
        link: rawData.link,
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

  // back button
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
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
              ? <Box>
                  <SkeletonProductDetails />
                </Box>
              : <>
                {/*Back button*/}
                <Button onClick={handleClickBack}>
                  <FaArrowLeft style={{ marginRight: 8 }} />
                  Back
                </Button>
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

                {/*descriptions*/}

                <Card sx={{ p: 4 }} style={{ marginTop: 64 }}>
                  <Typography variant="h5"
                    style={{ marginBottom: 16, color: '#80B213' }}
                  >
                    Descriptions
                  </Typography>
                  {product.features &&
                    (product.features).map((paragraph, index) => (
                      <Typography key={index} variant="body1" style={{ whiteSpace: 'pre-line' }} gutterBottom paragraph>
                        {paragraph}.
                      </Typography>
                    ))
                  }
                  {(!product.features || product.features.length === 0) &&
                    <Typography variant="body1" style={{ whiteSpace: 'pre-line' }} gutterBottom paragraph>
                      No description.
                    </Typography>
                  }
                  <a href={product.link} style={{color: '#80B213'}}>View this product on Amazon</a>
                </Card>
                <Card sx={{ p: 4 }} style={{ marginTop: 64 }}>
                  <Typography variant="h5"
                    style={{ marginBottom: 16, color: '#80B213' }}
                  >
                    Reviews
                  </Typography>
                  {
                    role && role !== 'visitor' &&
                    <>
                      <TextField
                        label="Write some of your reviews..."
                        multiline
                        fullWidth
                        rows={4}
                        sx={{ backgroundColor: 'white' }}
                        variant="outlined"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                      />

                      <div style={{ width: '100%', marginBottom: 40 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            marginTop: 28,
                            display: 'flex',
                            marginLeft: 'auto',
                            height: 40
                          }}
                          onClick={handlePostNewReview}
                        >
                          Post Review
                        </Button>
                      </div>
                    </>
                  }

                  {/*-----------------Comments---------------------*/}
                  <div style={{ marginTop: 16 }}>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                    {reviews
                      .slice((page - 1) * REVIEWS_PER_PAGE, (page - 1) * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE)
                      .map((review, index) => (
                        <>
                          <Review
                            key={index}
                            user={users.find(user => user._id === review.user)}
                            date={review.date}
                            content={review.content}
                          />
                          <Divider sx={{ borderStyle: 'dashed' }} />
                        </>
                      ))}
                  </div>

                  {/*-----------------Pagination---------------------*/}
                  <div
                    style={{
                      marginTop: 40, marginBottom: 32,
                      display: 'flex', justifyContent: 'center'
                    }}>
                    <Pagination
                      color="primary"
                      count={Math.ceil(reviews.length / REVIEWS_PER_PAGE)}
                      page={page}
                      siblingCount={2}
                      boundaryCount={1}
                      onChange={(event, value) => {
                        setPage(value);
                      }} />
                  </div>
                </Card>
              </>
            }

            <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={handleCloseSnackbar}
              message={errorReviews || "Error occured when posting review."}
            // action={action}
            />
          </Container>
        </Main>
      </Box>

    </>
  );
}
