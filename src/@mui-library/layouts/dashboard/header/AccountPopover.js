import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';

// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useSnackbar } from 'notistack';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../../../redux/users/users-thunks";
import {getRandomAvatar} from "../../../../utils/getRandomAvatar";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Account',
    linkTo: '/account',
  },
  {
    label: 'Help',
    linkTo: '/help/tutorials',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate("/login");
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    navigate(path);
  };

  // get current user
  const currentUser = useSelector((state) => state.auth.currentUser);

// ----------------------------------------------------------------------
  return (
    <>
      {/*------Top right - Avatar button------*/}
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {/*------Avatar image------*/}
        {currentUser ? (
            currentUser.avatar? (
                <CustomAvatar src={currentUser.avatar} alt={currentUser.name} />
            ) : (
                <CustomAvatar src={getRandomAvatar(currentUser.name)} name={currentUser.name} />
            )
        ) : (
          <CustomAvatar src="" alt="Anonymous" name="Anonymous" />
        )}
      </IconButtonAnimate>


      {/*------Popover menu------*/}
      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {/*------1. user name------*/}
          <Typography variant="subtitle2" noWrap>
            {currentUser? currentUser.name : "Anonymous Buyer"}
          </Typography>

          {/*------2. user email------*/}
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser? currentUser.email : "Anonymous Email"}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/*------3. Option list------*/}
        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/*------4. Logout button------*/}
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
