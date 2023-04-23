import PropTypes from 'prop-types';
import { List, Stack } from '@mui/material';
import { StyledSubheader } from './styles';
import NavList from './NavList';
import { Box } from '@mui/material';
import { hideScrollbarY } from '../../../utils/cssStyles';

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
};

export default function NavSectionVertical({ data, sx, ...other }) {

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      maxHeight: "calc(100vh - 200px)",
      ...hideScrollbarY,
    }}
  >
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{group.subheader}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
              />
            ))}
          </List>
        );
      })}
    </Stack>
  </Box>
  );
}
