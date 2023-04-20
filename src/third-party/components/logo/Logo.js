import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  // 1. logo photo
  const logo = (
    <Box
      component="img"
      src="/logo/shipshare-logo.svg"
      sx={{
        width: 150,
        cursor: 'pointer', ...sx }}
    />
  );


  if (disabledLink) {
    return logo;
  }

  // 2. logo link
  // remember to edit link here
  return (
    <Link component={RouterLink}
          to="/home"
          sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
