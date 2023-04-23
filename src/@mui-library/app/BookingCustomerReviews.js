import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Chip, Stack, Avatar, Rating, Button, CardHeader, Typography } from '@mui/material';
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
        action={<CarouselArrows onNext={handleNext} onPrevious={handlePrev} />}
        sx={{
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />

      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((item) => (
          <ReviewItem key={item.id} item={item} />
        ))}
      </Carousel>
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
