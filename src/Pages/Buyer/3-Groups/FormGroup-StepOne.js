import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card, CardContent} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";

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
            width: '35%',
            alignItems: 'center',
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
          ml: 20,
          mr: 20,
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
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                  variant={selectedButton === 1 ? "outlined" : "contained"}
                  sx={{mt: 3}}
                  onClick={() => handleButtonClick(1)}
                  className={selectedButton === 1 ? "selected" : ""}
                >{selectedButton === 1 ? 'selected' : 'select'}</Button>
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
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                  variant={selectedButton === 2 ? "outlined" : "contained"}
                  sx={{mt: 3}}
                  onClick={() => handleButtonClick(2)}
                  className={selectedButton === 2 ? "selected" : ""}
                >{selectedButton === 2 ? 'selected' : 'select'}</Button>
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
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                  variant={selectedButton === 3 ? "outlined" : "contained"}
                  sx={{mt: 3}}
                  onClick={() => handleButtonClick(3)}
                  className={selectedButton === 3 ? "selected" : ""}
                >{selectedButton === 3 ? 'selected' : 'select'}</Button>
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
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
                  variant={selectedButton === 4 ? "outlined" : "contained"}
                  sx={{mt: 3}}
                  onClick={() => handleButtonClick(4)}
                  className={selectedButton === 4 ? "selected" : ""}
                >{selectedButton === 4 ? 'selected' : 'select'}</Button>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Box>
    </>

  );
}