import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../utils/formatNumber';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { IncrementerButton } from '../../components/custom-input';
import { ColorSinglePicker } from '../../components/color-utils';
import FormProvider, { RHFSelect } from '../../components/hook-form';

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  // onAddCart: PropTypes.func,
  // product: PropTypes.object,
  // onGotoStep: PropTypes.func,
};

export default function ProductDetailsSummary({  product, ...other }) {
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


  const defaultValues = {
    id,
    name,
    cover,
    price,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = async (data) => {
    // try {
    //   if (!alreadyProduct) {
    //     onAddCart({
    //       ...data,
    //       colors: [values.colors],
    //       subtotal: data.price * data.quantity,
    //     });
    //   }
    //   onGotoStep(0);
    //   navigate(PATH_DASHBOARD.eCommerce.checkout);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleAddCart = async () => {
    // try {
    //   onAddCart({
    //     ...values,
    //     colors: [values.colors],
    //     subtotal: values.price * values.quantity,
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
          {/* Brand */}
          <Label
            variant="soft"
            color='success'
            sx={{ textTransform: 'uppercase', mr: 'auto' }}
          >
            Brand: {brand}
          </Label>

          {/* Name */}
          <Typography variant="h5">{name}</Typography>

          {/* Rating */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={totalRating} precision={0.1} readOnly />

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(totalReview)}
              reviews)
            </Typography>
          </Stack>

          {/* Price */}
          <Typography variant="h4">
            {fCurrency(price)}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack>
          <Typography variant="subtitle2">Descriptions</Typography>
          <Typography variant="subtitle2">{description}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

      </Stack>
    </FormProvider>
  );
}
