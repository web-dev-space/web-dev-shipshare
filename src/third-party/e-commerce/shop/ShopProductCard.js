import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Stack } from '@mui/material';
// components
import Image from '../../components/image';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const id = product.asin;
  const name = product.title;
  const price = product.price? product.price.name : "Unavailable";
  const picture = product.image;

  // const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(name));

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative'}} style={{padding: "32px 32px 0px 32px"}}>
        <Image alt={name} src={picture} ratio="1/1"
               sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
          <Stack direction="row" spacing={0.5}
                 sx={{ typography: 'subtitle2',
                     width: '100%',
                     display: '-webkit-box',
                     '-webkit-line-clamp': 2,
                     '-webkit-box-orient': 'vertical',
                     overflow: 'hidden'
          }}>
              <Box component="span">{name}</Box>
          </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={0.5} sx={{ typography: 'body', color: '#EEBD5E'}}>
                <Box component="span">Amazon</Box>
            </Stack>
          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1', color: '#80B213'}}>
            <Box component="span">{price}</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
