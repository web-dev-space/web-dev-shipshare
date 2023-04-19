import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    IconButton,
    Pagination,
    Divider
} from '@mui/material';
import { useSettingsContext } from '../../../../third-party/components/settings';
// sections
import {ProductDetailsCarousel} from '../../../../third-party/e-commerce/details';
import Header from "../../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../../../third-party/layouts/dashboard/Main"
import {getProductDetails} from "../../../../redux/products/products-service";
import ProductDetailCard from "./components/ProductDetailCard";
import {findPostByIdThunk, updatePostThunk} from "../../../../redux/posts/posts-thunks";
import {getRandomAvatar} from "../../../../utils/getRandomAvatar";
import DeleteIcon from "@mui/icons-material/Delete";
import {reviews as sampleReviews} from "../../../../sampleData/reviews";
import {findAllUsersThunk} from "../../../../redux/users/users-thunks";
import {useDispatch, useSelector} from "react-redux";


// ----------------------------------------------------------------------
const REVIEWS_PER_PAGE = 5;

// Comment component
const Review = ({user, date, content}) => {
    return (
        <div style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center',
            marginTop: 32, marginBottom: 32}}>
            {user &&
                <Avatar src={user.avatar? user.avatar : getRandomAvatar(user.name)} sx={{ width: 48, height: 48, mb: 'auto' }} />}
            <div style={{ marginLeft: 16, width: "100%"}}>
                <div style={{display: 'flex', flexDirection: "row"}}>
                    <div style={{width:"100%"}}>
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

  const {users} = useSelector((state) => state.users);

  const {productId} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState('');

  const [reviews, setReviews] = useState(sampleReviews);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(findAllUsersThunk());
    }, []);

  function handlePostNewReview() {
    console.log(newReview);
    setNewReview('');
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

                      {/*descriptions*/}

                      <Card sx={{p:4}}  style={{ marginTop: 64}}>
                          <Typography variant="h5"
                            style={{ marginBottom: 16, color: '#80B213'}}
                          >
                              Descriptions
                          </Typography>
                          {(product.description || '').split('.\ ').map((paragraph, index) => (
                              <Typography key={index} variant="body1" style={{whiteSpace: 'pre-line'}} gutterBottom paragraph>
                                  {paragraph}.
                              </Typography>
                          ))}
                      </Card>
                      <Card sx={{p:4}}  style={{ marginTop: 64}}>
                          <Typography variant="h5"
                                      style={{ marginBottom: 16, color: '#80B213'}}
                          >
                              Reviews
                          </Typography>
                          {

                              <>
                                  <TextField
                                      label="Write some of your reviews..."
                                      multiline
                                      fullWidth
                                      rows={4}
                                      sx={{ backgroundColor: 'white'}}
                                      variant="outlined"
                                      value={newReview}
                                      onChange={(e) => setNewReview(e.target.value)}
                                  />

                                  <div style={{ width: '100%', marginBottom:40}}>
                                      <Button
                                          variant="contained"
                                          color="primary"
                                          style={{
                                              marginTop: 28,
                                              display: 'flex',
                                              marginLeft: 'auto',
                                              height: 40  }}
                                          onClick={handlePostNewReview}
                                      >
                                          Post Review
                                      </Button>
                                  </div>
                              </>
                          }

                          {/*-----------------Comments---------------------*/}
                          <div style={{ marginTop: 16}}>
                              {reviews
                                  .slice((page - 1) * REVIEWS_PER_PAGE, (page - 1) * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE)
                                  .map((review, index) => (
                                      <>
                                          <Divider sx={{ borderStyle: 'dashed' }} />
                                          <Review
                                              key={index}
                                              user={users.find(user => user._id === review.user)}
                                              date={review.date}
                                              content={review.content}
                                          />
                                      </>
                                  ))}
                          </div>

                          <Divider sx={{ borderStyle: 'dashed'}} />

                          {/*-----------------Pagination---------------------*/}
                          <div
                              style={{ marginTop: 40, marginBottom: 32,
                                  display: 'flex', justifyContent: 'center'}}>
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
          </Container>
        </Main>
      </Box>

    </>
  );
}