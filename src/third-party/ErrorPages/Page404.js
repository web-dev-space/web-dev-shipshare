import { m } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Box } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>Error 404 | ShipShare</title>
      </Helmet>

      <Box style={{display: 'flex', height: '100%', justifyContent:'center', alignItems: 'center', margin:10}}>
      <MotionContainer style={{display: 'flex', height: '100%', justifyContent:'center', alignItems: 'center', flexDirection:'column'}}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in} style={{display: 'flex',justifyContent:'center', alignItems: 'center', flexDirection:'column'}}>
          <Typography sx={{ color: 'text.secondary' , ml:3, mr:3}}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
          </Typography>
          <Typography sx={{ color: 'text.secondary' , ml:3, mr:3}}>
            Be sure to check your spelling.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={RouterLink} to="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </Box>
    </>
  );
}
