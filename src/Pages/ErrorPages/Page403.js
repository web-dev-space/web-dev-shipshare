import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Box } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../../third-party/components/animate';
// assets
import { ForbiddenIllustration } from '../../third-party/assets/illustrations';

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <Box style={{display: 'flex', height: '100%', justifyContent:'center', alignItems: 'center'}}>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            No permission
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            The page you&apos;re trying access has restricted access.
            <br />
            Please refer to your system administrator
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
  );
}
