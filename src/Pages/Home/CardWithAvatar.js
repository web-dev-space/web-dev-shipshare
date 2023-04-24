import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const StyledCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '2rem',
  minWidth: 300,
  maxWidth: 500,
});

const StyledCardContent = styled(CardContent)({
  flex: '1 0 auto',
});

const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1rem',
});

const StyledSubtitle = styled(Typography)({
  fontSize: '0.9rem',
  color: 'grey',
  marginBottom: '0.4rem',
});

const CardWithAvatar = ({ avatarUrl, name, route, date, pickupAddress, isLargeScreen, isSmallScreen , isDiscoverSmallScreen}) => {
  const [isPhoneScreen, setIsPhoneScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneScreen(window.innerWidth < 460);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <StyledCard>
      <CardMedia
        component="img"
        sx={{ width: isDiscoverSmallScreen? 30: 48, height: isDiscoverSmallScreen? 30: 48, objectFit: 'cover' , borderRadius: '50%', marginLeft: 2,marginTop: -3}}
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
        <div style={{flexDirection: isPhoneScreen? 'column':'row', display: 'flex'}}>
          <Typography variant={isPhoneScreen? "caption":"body2"} color="text.secondary" sx={{mr:1}}>
            End in {date}
          </Typography>
          {!isPhoneScreen &&
          <Typography variant={isPhoneScreen? "caption":"body2"} color="text.secondary" sx={{mr:1}}>
            |
          </Typography>
          }
          <Typography variant={isPhoneScreen? "caption":"body2"} color="text.secondary" sx={{mt:isPhoneScreen? 1:0}}>
            Pick up at {pickupAddress}
          </Typography>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};

export default CardWithAvatar;