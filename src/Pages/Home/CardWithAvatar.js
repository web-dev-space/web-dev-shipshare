import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '2rem',
  minWidth: 450,

});

const StyledCardContent = styled(CardContent)({
  flex: '1 0 auto',
});

const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
});

const StyledSubtitle = styled(Typography)({
  fontSize: '0.9rem',
  color: 'grey',
  marginBottom: '0.5rem',
});

const CardWithAvatar = ({ avatarUrl, name, route, date, pickupAddress, isLargeScreen, isSmallScreen , isDiscoverSmallScreen}) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{ width: isDiscoverSmallScreen? 30: 50, height: isDiscoverSmallScreen? 30: 50, objectFit: 'cover' , borderRadius: '50%', marginLeft: '1rem',marginTop: -3}}
        image={avatarUrl}
        alt="avatar"
      />
      <StyledCardContent>
        <StyledTypography gutterBottom variant={isLargeScreen? "h5": 'subtitle1'}>
          {name}
        </StyledTypography>
        <StyledSubtitle variant="body2" color="text.secondary">
          {route}
        </StyledSubtitle>
        <div style={{flexDirection: 'row', display: 'flex'}}>
          <Typography variant="body2" color="text.secondary" sx={{mr:1}}>
            End in {date}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{mr:1}}>
            |
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pick up at {pickupAddress}
          </Typography>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};

export default CardWithAvatar;