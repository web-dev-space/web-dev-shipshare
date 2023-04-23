import { m } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Box } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <>
    <Helmet>
      <title>Error 403 | ShipShare</title>
    </Helmet>

    <Box style={{display: 'flex', height: '100%', justifyContent:'center', alignItems: 'center', margin:10}}>
      <MotionContainer style={{display: 'flex', height: '100%', justifyContent:'center', alignItems: 'center', flexDirection:'column'}}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            No permission
          </Typography>
        </m.div>

        <m.div variants={varBounce().in} style={{display: 'flex',justifyContent:'center', alignItems: 'center', flexDirection:'column'}}>
          <Typography sx={{ color: 'text.secondary' }}>
            You don&apos;t have permission to access this page.
          </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
            Please refer to our website administrator for more information.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} to="/" size="large" variant="contained"
          style={{justifyContent:'center', alignItems: 'center'}}
        >
          Go to Home
        </Button>
      </MotionContainer>
    </Box>
    </>
  );
}
