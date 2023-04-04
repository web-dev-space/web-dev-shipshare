// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { CustomAvatar } from '../../../components/custom-avatar';

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

  return (
    <StyledRoot>
      {/*-----------Avatar----------*/}
      <CustomAvatar src="" alt="Rae" name="Rae" />

      <Box sx={{ ml: 2, minWidth: 0 }}>

        {/*------------User Name------------*/}
        <Typography variant="subtitle2" noWrap>
          Rae
        </Typography>

        {/*-------------User Type-----------*/}
        <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
          Admin
        </Typography>
      </Box>
    </StyledRoot>
  );
}
