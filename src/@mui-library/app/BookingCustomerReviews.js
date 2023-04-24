import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {Card, Chip, Stack, Avatar, Rating, Button, CardHeader, Typography, Box} from '@mui/material';
// utils
import { fDateTime } from '../utils/formatTime';
// components
import Iconify from '../components/iconify';
import Carousel, { CarouselArrows } from '../components/carousel';
import {useNavigate} from "react-router-dom";

// ----------------------------------------------------------------------

BookingCustomerReviews.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BookingCustomerReviews({ title, subheader, list, ...other }) {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const [selectCustomer, setSelectCustomer] = useState(0);

  const customerInfo = list.find((_, index) => index === selectCustomer);

  const carouselSettings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setSelectCustomer(next),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={list.length > 0 ? <CarouselArrows onNext={handleNext} onPrevious={handlePrev} /> : null}
        sx={{
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />

      {
        (!list || list.length === 0) && <Box sx={{ p: 3, textAlign: 'center' }}>
            <svg width="180" height="150" viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="illustrations/illustration_empty_mail">
                <path id="Subtract" opacity="0.16" fill-rule="evenodd" clip-rule="evenodd" d="M179.048 126.867V164.619C179.048 169.607 181.471 174.271 185.644 177.005C198.54 185.454 226.972 203.057 240 203.057C253.029 203.057 281.46 185.454 294.357 177.005C298.529 174.271 300.953 169.607 300.953 164.619V126.867C300.953 114.243 290.719 104.01 278.095 104.01H201.905C189.281 104.01 179.048 114.243 179.048 126.867ZM207.619 126.867C204.463 126.867 201.905 129.426 201.905 132.582C201.905 135.737 204.463 138.296 207.619 138.296H241.905C245.061 138.296 247.619 135.737 247.619 132.582C247.619 129.426 245.061 126.867 241.905 126.867H207.619ZM207.619 153.534C204.463 153.534 201.905 156.092 201.905 159.248C201.905 162.404 204.463 164.963 207.619 164.963H264.762C267.918 164.963 270.476 162.404 270.476 159.248C270.476 156.092 267.918 153.534 264.762 153.534H207.619Z" fill="#919EAB"/>
                <g id="Vector_3">
                  <path d="M201.905 132.581C201.905 129.426 204.463 126.867 207.619 126.867H241.905C245.061 126.867 247.619 129.426 247.619 132.581C247.619 135.737 245.061 138.296 241.905 138.296H207.619C204.463 138.296 201.905 135.737 201.905 132.581Z" fill="#919EAB" fill-opacity="0.48"/>
                  <path d="M201.905 159.248C201.905 156.092 204.463 153.534 207.619 153.534H264.762C267.918 153.534 270.476 156.092 270.476 159.248C270.476 162.404 267.918 164.962 264.762 164.962H207.619C204.463 164.962 201.905 162.404 201.905 159.248Z" fill="#919EAB" fill-opacity="0.48"/>
                </g>
                <path id="Subtract_2" d="M179.048 136.398C175.166 139.28 171.735 141.915 168.982 144.068C164.396 147.654 161.521 152.944 161.133 158.753C160.605 166.659 160 179.93 160 199.248C160 217.517 161.082 230.378 162.092 238.407C162.925 245.027 167.358 250.277 173.892 251.626C184.37 253.789 204.379 256.391 240 256.391C275.621 256.391 295.63 253.789 306.107 251.626C312.642 250.277 317.075 245.027 317.908 238.407C318.918 230.378 320 217.517 320 199.248C320 179.93 319.395 166.659 318.867 158.753C318.479 152.944 315.604 147.654 311.018 144.068C308.265 141.915 304.834 139.28 300.952 136.398V164.619C300.952 169.607 298.529 174.271 294.357 177.005C281.46 185.454 253.029 203.057 240 203.057C226.971 203.057 198.54 185.454 185.643 177.005C181.471 174.271 179.048 169.607 179.048 164.619V136.398Z" fill="#919EAB" fill-opacity="0.48"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_0_9512" x1="328.81" y1="424.032" x2="505.393" y2="26.0479" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#919EAB"/>
                  <stop offset="1" stop-color="#919EAB" stop-opacity="0.01"/>
                </linearGradient>
              </defs>
            </svg>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No comments yet.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Check back later for feedback!
            </Typography>
          </Box>
      }
      {
        list.length > 0 && <Carousel ref={carouselRef} {...carouselSettings}>
            {list.map((item) => (
                <ReviewItem key={item.id} item={item} />
            ))}
          </Carousel>
      }
    </Card>
  );
}

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.array,
    name: PropTypes.string,
    avatar: PropTypes.string,
    rating: PropTypes.number,
    description: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
  }),
};

function ReviewItem({ item }) {
  const { avatar, name, description, postedAt, postId } = item;
  const navigate = useNavigate();

  return (
    <Stack
      spacing={2}
      sx={{
        position: 'relative',
        p: (theme) => theme.spacing(3, 3, 2, 3),
      }}
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/community/discover/post/${postId}`)}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={name} src={avatar} />

        <div>
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Posted {fDateTime(postedAt)}
          </Typography>
        </div>
      </Stack>

      <Typography variant="body2">{description}</Typography>
    </Stack>
  );
}
