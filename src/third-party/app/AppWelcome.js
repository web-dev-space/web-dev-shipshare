import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';
// utils
import { bgGradient } from '../utils/cssStyles';
import {useSelector} from "react-redux";

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
  color: theme.palette.primary.darker,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const StyledBg = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: theme.palette.common.white,
  '&:before': {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -2,
    content: '""',
    opacity: 0.1,

    ...bgGradient({
      direction: '135deg',
      startColor: "rgba(251, 254, 243, 0.6)",
      endColor: theme.palette.primary.light,
    }),
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  img: PropTypes.node,
  action: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default function AppWelcome({ title, title2, description, action, img, ...other }) {

  // get current user
  const currentUser = useSelector((state) => state.auth.currentUser);
  // console.log(currentUser);


  return (
    <StyledRoot {...other}>
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          pl: 5,
          py: { xs: 8, md: 0 },
          pr: { xs: 5, md: 0 },
          textAlign: { xs: 'center', md: 'left' },
        }}

      >
        {/*/!*---- current user is not null ----*!/*/}
        {/*{currentUser &&*/}
        {/*  <Typography paragraph variant="h4" sx={{whiteSpace: 'pre-line', mt: -16}}>*/}
        {/*    Welcome back, <span style={{color:'orange'}}>{currentUser.name}</span> ~*/}
        {/*  </Typography>*/}
        {/*}*/}
        {/*{currentUser &&*/}
        {/*  <Typography paragraph variant="h4" sx={{whiteSpace: 'pre-line', mb: 6}}>*/}
        {/*    Thank you for choosing ShipShare!*/}
        {/*  </Typography>*/}
        {/*}*/}


        {/*---- all users can see ----*/}
        <Typography paragraph variant="h2" sx={{ whiteSpace: 'pre-line' ,mt:-4}}>
          {title}
        </Typography>
        <Typography paragraph variant="h2" sx={{ whiteSpace: 'pre-line' }}>
          {title2}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            mb: { xs: 5, xl: 5 },
            width: "60%",
          }}
        >
          {description}
        </Typography>

        {action && action}
      </Stack>

      {img && img}

      <StyledBg />
    </StyledRoot>
  );
}
