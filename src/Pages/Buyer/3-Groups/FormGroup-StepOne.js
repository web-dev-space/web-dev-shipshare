import { Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function FormGroupStepOne({ onButtonClick }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    onButtonClick(buttonId);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography
          variant="h4"
        >Choose a Route</Typography>
        <Box
          sx={{
            width: {xs: '80%', sm: '50%', md: '35%', lg: '35%', xl: '35%', xxl: '35%'},
            alignItems: 'center',
            textAlign: 'center',
            mx:{xs: 0, sm: 10, md: 10, lg: 10, xl: 10, xxl: 10},
          }}
        >
          <Typography
            variant="caption"
          >Each transportation route has its own unique advantages,
            so please choose the one that best fits your shipping needs.</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          mb: 5,
          mx: {xs: 5, sm: 10, md: 10, lg: 10, xl: 10, xxl: 10},
          flexWrap: 'wrap',
          '& > *': {
            flexBasis: '22%',
            mb: 3,
          },
          '@media (max-width: 1500px)': {
            // flexDirection: 'column',
            '& > *': {
              flexBasis: '45%',
            },
          },
          '@media (max-width: 800px)': {
            flexDirection: 'column',
            '& > *': {
              flexBasis: '100%',
            },
          },
        }}

      >
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center',textAlign: 'center'}}>
              <Typography variant="subtitle2" component="div" sx={{mb: 3}}>
                Air Standard
              </Typography>
              <Typography variant="caption" component="div" sx={{mb: 3}}>
                Fastest delivery time.
                Suitable for normal items.
              </Typography>
            </div>
            <div
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography variant="body2"
                          component="div"
                          style={{color: 'rgb(238, 189, 94)'}}>
                $ 15 / kg
              </Typography>
              <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                1 week
              </Typography>
              <Typography variant="caption" component="div">
                <Button
                  variant={selectedButton === 'Air Standard' ? "outlined" : "contained"}
                  sx={{mt: 3}}
                  onClick={() => handleButtonClick('Air Standard')}
                  className={selectedButton === 'Air Standard' ? "selected" : ""}
                >{selectedButton === 'Air Standard' ? 'selected' : 'select'}</Button>
              </Typography>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center',textAlign: 'center'}}>
              <Typography variant="subtitle2" component="div" sx={{mb: 3}}>
                Air Sensitive
              </Typography>
              <Typography variant="caption" component="div" sx={{mb: 3}}>
                Faster delivery time.
                Suitable for sensitive items.
              </Typography>
            </div>
            <div
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography variant="body2"
                          component="div"
                          style={{color: 'rgb(238, 189, 94)'}}>
                $ 20 / kg
              </Typography>
              <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                2 week
              </Typography>
              <Typography variant="caption" component="div">
                <Button
                  variant={selectedButton === 'Air Sensitive' ? "outlined" : "contained"}
                  sx={{mt: 3}}
                  onClick={() => handleButtonClick('Air Sensitive')}
                  className={selectedButton === 'Air Sensitive' ? "selected" : ""}
                >{selectedButton === 'Air Sensitive' ? 'selected' : 'select'}</Button>
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center',textAlign: 'center'}}>
              <Typography variant="subtitle2" component="div" sx={{mb: 3}}>
                Sea Standard
              </Typography>
              <Typography variant="caption" component="div" sx={{mb: 3}}>
                Lowest cost.
                Suitable for normal items.
              </Typography>
            </div>
            <div
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography variant="body2"
                          component="div"
                          style={{color: 'rgb(238, 189, 94)'}}>
                $ 5 / kg
              </Typography>
              <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                4 week
              </Typography>
              <Typography variant="caption" component="div">
                <Button
                  variant={selectedButton === 'Sea Standard' ? "outlined" : "contained"}
                  sx={{mt: 3}}
                  onClick={() => handleButtonClick('Sea Standard')}
                  className={selectedButton === 'Sea Standard' ? "selected" : ""}
                >{selectedButton === 'Sea Standard' ? 'selected' : 'select'}</Button>
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center',textAlign: 'center'}}>
              <Typography variant="subtitle2" component="div" sx={{mb: 3}}>
                Sea Sensitive
              </Typography>
              <Typography variant="caption" component="div" sx={{mb: 3}}>
                Lower cost.
                Suitable for sensitive items.
              </Typography>
            </div>
            <div
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography variant="body2"
                          component="div"
                          style={{color: 'rgb(238, 189, 94)'}}>
                $ 10 / kg
              </Typography>
              <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                6 week
              </Typography>
              <Typography variant="caption" component="div">
                <Button
                  variant={selectedButton === 'Sea Sensitive' ? "outlined" : "contained"}
                  sx={{mt: 3}}
                  onClick={() => handleButtonClick('Sea Sensitive')}
                  className={selectedButton === 'Sea Sensitive' ? "selected" : ""}
                >{selectedButton === 'Sea Sensitive' ? 'selected' : 'select'}</Button>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Box>
    </>

  );
}