import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from "../../third-party/layouts/dashboard/header";
import {useState} from "react";
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../third-party/layouts/dashboard/Main"
import {Card, CardContent} from "@mui/material";

// const steps = ['Choose a Route', 'Enter Group Details', 'Done'];
const steps = ['', '', ''];
export default function FormGroupPageOne() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header onOpenNav={handleOpen}/>
      {/*-------Box is the layout of the whole page-----*/}
      <Box
        sx={{
          display: {lg: 'flex'},
          minHeight: {lg: 1},
        }}
      >
        {/*--------------Navigation bar------------------*/}
        <NavVertical openNav={open} onCloseNav={handleClose}/>
        <Main>
          <Box sx={{width: '100%', alignItems: 'center'}}>
            <Stepper
              activeStep={activeStep}

              sx={{
                width: '50%',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                justifyContent: 'center',
                mb: 5,
              }}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                // if (isStepOptional(index)) {
                //   labelProps.optional = (
                //     <Typography variant="caption">Optional</Typography>
                //   );
                // }
                // if (isStepSkipped(index)) {
                //   stepProps.completed = false;
                // }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{mt: 2, mb: 1}}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                  <Box sx={{flex: '1 1 auto'}}/>
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>

                {/*Body content*/}

                {/*page 1*/}
                {activeStep === 0 ? (
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
                        flexWrap: 'wrap', // add this property to allow flex items to wrap
                        '& > *': {
                          flexBasis: '22%', // set a smaller width for each card
                          mb: 3,
                        },
                        '@media (max-width: 1500px)': { // add a media query to change the layout
                          // flexDirection: 'column',
                          '& > *': {
                            flexBasis: '45%',
                          },
                        },
                        '@media (max-width: 800px)': { // add a media query to change the layout
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
                          }}
                        >
                          <Typography variant="subtitle2" component="div" sx={{mb: 3}}>
                            Air Standard
                          </Typography>
                          <Typography variant="caption" component="div" sx={{mb: 3}}>
                            Fastest delivery time.
                            Suitable for normal items.
                          </Typography>
                          <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                            $ 15 / kg
                          </Typography>
                          <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                            1 week
                          </Typography>
                          <Typography variant="caption" component="div">
                            <Button variant="contained" sx={{mt: 3}}>Select</Button>
                          </Typography>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="subtitle2" component="div" sx={{mb: 3}}>
                            Air Sensitive
                          </Typography>
                          <Typography variant="caption" component="div" sx={{mb: 3}}>
                            Faster delivery time.
                            Suitable for sensitive items.
                          </Typography>
                          <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                            $ 15 / kg
                          </Typography>
                          <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                            1 week
                          </Typography>
                          <Typography variant="caption" component="div">
                            <Button variant="contained" sx={{mt: 3}}>Select</Button>
                          </Typography>

                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="subtitle2" component="div" sx={{mb: 3}}>
                            Sea Standard
                          </Typography>
                          <Typography variant="caption" component="div" sx={{mb: 3}}>
                            Lowest cost.
                            Suitable for normal items.
                          </Typography>
                          <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                            $ 15 / kg
                          </Typography>
                          <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                            1 week
                          </Typography>
                          <Typography variant="caption" component="div">
                            <Button variant="contained" sx={{mt: 3}}>Select</Button>
                          </Typography>

                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >

                          <Typography variant="subtitle2" component="div" sx={{mb: 3}}>
                            Sea Sensitive
                          </Typography>
                          <Typography variant="caption" component="div" sx={{mb: 3}}>
                            Lower cost.
                            Suitable for sensitive items.
                          </Typography>

                          <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                            $ 15 / kg
                          </Typography>
                          <Typography variant="body2" component="div" style={{color: 'rgb(238, 189, 94)'}}>
                            1 week
                          </Typography>

                          <Typography variant="caption" component="div">
                            <Button variant="contained" sx={{mt: 3}}>Select</Button>
                          </Typography>

                        </CardContent>
                      </Card>
                    </Box>
                  </>
                ) : (
                  <React.Fragment>

                  </React.Fragment>
                )}

                {/*page 2*/}
                {activeStep === 1 ? (
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
                      >Enter Group Details</Typography>
                      <Box
                        sx={{
                          width: '35%',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="caption"
                        >Please provide accurate and comprehensive information about your group
                          to ensure the best possible experience for all members.</Typography>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <React.Fragment>

                  </React.Fragment>
                )}

                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2,ml:10,mr:10}}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{mr: 1}}
                  >
                    Back
                  </Button>
                  <Box sx={{flex: '1 1 auto'}}/>
                  {/*{isStepOptional(activeStep) && (*/}
                  {/*  <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>*/}
                  {/*    Skip*/}
                  {/*  </Button>*/}
                  {/*)}*/}

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Main>
      </Box>
    </>

  );
}