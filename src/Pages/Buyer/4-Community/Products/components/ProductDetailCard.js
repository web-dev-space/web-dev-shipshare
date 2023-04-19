import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Stack,
  Container,
  Rating,
  Divider,
  Typography,
} from '@mui/material';
// components
import Label from '../../../../../third-party/components/label';

// ----------------------------------------------------------------------

ProductDetailCard.propTypes = {
  cart: PropTypes.array
};

export default function ProductDetailCard({  product, ...other }) {
  const navigate = useNavigate();

  const {
    id,
    name,
    price,
    cover,
    totalRating,
    totalReview,
    description,
    brand,
  } = product;



  return (
    <Container>
      <Stack
        spacing={3}
        sx={{
          p: (theme) => ({
            md: theme.spacing(5, 5, 0, 2),
          }),
        }}
        {...other}
      >
        <Stack spacing={2}>
          {/* 1. Brand */}
          <Label
            variant="soft"
            color='success'
            sx={{ textTransform: 'uppercase', mr: 'auto' }}
          >
            Brand: {brand}
          </Label>

          {/* 2. Name */}
          <Typography variant="h5">{name}</Typography>

          {/* 3. Rating */}
          <Stack direction="row" alignItems="center" spacing={1}>
            {/* a. stars */}
            <Rating value={totalRating} precision={0.1} readOnly />
            {/* b. total ratings */}
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {totalReview}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                reviews
              </Typography>
            </Stack>
          </Stack>

          {/* 4. Price */}
          <Typography variant="h4">
            {price}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack>
          <Typography variant="subtitle1">Descriptions</Typography>
          <Typography variant="subtitle2" paragraph>{description}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

      </Stack>
    </Container>
  );
}
