// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import {useSelector} from "react-redux";
import {getRandomAvatar} from "../../../../utils/getRandomAvatar";

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  let name = "Anonymous"
  let role = "Visitor"
  if (currentUser !== null){
    name = currentUser.name
    const str = currentUser.role;
    role = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <StyledRoot>
      {/*-----------Left: Avatar----------*/}
      {currentUser ? (
          currentUser.avatar? (
              <CustomAvatar src={currentUser.avatar} alt={currentUser.name} />
          ) : (
              <CustomAvatar src={getRandomAvatar(currentUser.name)} name={currentUser.name} />
          )
      ) : (
          <CustomAvatar src="" alt="Anonymous" name="Anonymous" />
      )}


      {/*-----------Right: User Info----------*/}
      <Box sx={{ ml: 2, minWidth: 0 }}>

        {/*------------User Name------------*/}
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>

        {/*-------------User Type-----------*/}
        <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
          {role}
        </Typography>
      </Box>
    </StyledRoot>
  );
}
