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
import {Card, CardContent, Container, Grid, Stack} from "@mui/material";
import TextField from '@mui/material/TextField';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import FormGroupStepOne from "./FormGroup-StepOne";
import FormGroupStepTwo from "./FormGroup-StepTwo";
import FormGroupStepThree from "./FormGroup-StepThree";

// const steps = ['Choose a Route', 'Enter Group Details', 'Done'];
const steps = ['', '', ''];
export default function FormGroupPage() {
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
          <Container
            maxWidth="xl"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Box sx={{
              width: '100%',
              alignItems: 'center',
            }}>
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
                    <FormGroupStepOne/>
                  ) : (
                    <React.Fragment>

                    </React.Fragment>
                  )}

                  {/*page 2*/}
                  {activeStep === 1 ? (
                    <FormGroupStepTwo/>
                  ) : (
                    <React.Fragment>

                    </React.Fragment>
                  )}

                  {/*page 3*/}
                  {activeStep === 2 ? (
                    <FormGroupStepThree/>
                  ) : (
                    <React.Fragment>

                    </React.Fragment>
                  )}

                  <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, ml: 10, mr: 10}}>
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
          </Container>
        </Main>
      </Box>
    </>

  );
}