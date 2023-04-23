// @mui
import { Card, Skeleton, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonProductItem({ ...other }) {
  return (
    <Card {...other}>
      <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Skeleton variant="text" sx={{ width: 0.5 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Skeleton variant="text" sx={{ width: 30 }} />
            <Skeleton variant="text" sx={{ width: 40 }} />
        </Stack>
      </Stack>
    </Card>
  );
}
