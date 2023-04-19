import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Card, Typography, Stack } from '@mui/material';
// components
import Image from '../../../../../third-party/components/image';

// ----------------------------------------------------------------------

export default function ProductListCard({ product }) {
  const id = product.asin;
  const name = product.title;
  const price = product.price? product.price.name : "Unavailable";
  const picture = product.image;

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/community/products/${id}`)}
    >
        {/* image */}
        <Box sx={{ position: 'relative'}} style={{padding: "32px 32px 0px 32px"}}>
        <Image alt={name} src={picture} ratio="1/1"
               sx={{ borderRadius: 1.5 }} />
        </Box>

        <Stack sx={{ p: 3 }}>
            {/* name */}
            <Stack direction="row"
                 sx={{width: '100%',
                     display: '-webkit-box',
                     '-webkit-line-clamp': 2,
                     '-webkit-box-orient': 'vertical',
                     overflow: 'hidden'
                }}
                style={{marginBottom: 16}}
            >
              <Typography variant="subtitle2">{name}</Typography>
            </Stack>

            {/* website and price */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row">
                    <Typography variant="body" color='#EEBD5E'>Amazon</Typography>
                </Stack>
                <Stack direction="row">
                    <Typography variant='subtitle1' color='#80B213'>{price}</Typography>
                </Stack>
            </Stack>
        </Stack>
    </Card>
  );
}
