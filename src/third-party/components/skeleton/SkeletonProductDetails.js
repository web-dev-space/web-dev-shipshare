// @mui
import { Grid, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonProductDetails({ ...other }) {
  return (
      <Grid>
        <Grid container spacing={3} {...other}>
          <Grid item xs={12} md={6} lg={7}>
            <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <Skeleton variant="text" height={40} width={80} style={{marginTop: 32}}/>
            <Skeleton variant="text" height={240} />
            <Skeleton variant="text" height={40} width={200}/>
            <Skeleton variant="text" height={40} width={120}/>
          </Grid>
        </Grid>

          <Grid container spacing={3} style={{marginTop: 64}}{...other}>
            <Grid item xs={12} md={6} lg={5}>
              <Skeleton variant="text" height={40} width={160} />
              <Skeleton variant="text" height={40} width={800} style={{marginTop:32}}/>
              <Skeleton variant="text" height={40} width={700}/>
              <Skeleton variant="text" height={40} width={600}/>

            </Grid>
          </Grid>
      </Grid>
  );
}
