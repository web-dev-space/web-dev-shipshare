import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from "../../../third-party/layouts/dashboard/header";
import {useEffect, useState} from "react";
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../../third-party/layouts/dashboard/Main"
import {Card, CardContent, Container, Grid, Stack} from "@mui/material";
import TextField from '@mui/material/TextField';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import FormGroupStepOne from "./FormGroup-StepOne";
import FormGroupStepTwo from "./FormGroup-StepTwo";
import FormGroupStepThree from "./FormGroup-StepThree";
import FormProvider, {RHFTextField} from "../../../third-party/components/hook-form";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

const steps = ['', '', ''];
export default function FormGroupPage() {

  const [activeStep, setActiveStep] = useState(0);
  const [buttonSelected, setButtonSelected] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/buyer/groups");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    console.log("buttonSelected: " + buttonSelected)
    console.log("activeStep: " + activeStep)
    console.log('methods', methods)
    console.log('methods.formState', methods.formState)
    if (activeStep === 2) {
      navigate("/buyer/groups");
      return;
    }
    ;
    if (activeStep === 0 && buttonSelected !== "") {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      return;
    }
    if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      return;
    }

  };

  const handleButtonClick = (button) => {
    console.log("handlebuttonclick: " + button)
    setButtonSelected(button);
    setValue("shipRoute", button);

  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("endDate", date);
  };

  const isButtonSelected = () => {
    return buttonSelected !== "";
  };

  // ---- handle the new group object ---
  const defaultValues = {
    groupName: '',
    receiverName: '',
    pickupLocation: '',
    phoneNumber: '',
    endDate: '',
  };

  // validation schema
  const NewGroupSchema = Yup.object().shape({
    groupName: Yup.string().required('Required'),
    receiverName: Yup.string().required('Required'),
    pickupLocation: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    // endDate: Yup.date().default(() => new Date()),
  });

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema), defaultValues,
  });

  const {handleSubmit, setValue} = methods;
  const {enqueueSnackbar} = useSnackbar();

  const onSubmit = (data) => {
    enqueueSnackbar('Group Created!');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log('data', data);
  };


  const getPageContent = () => {
    switch (activeStep) {
      case 0:
        return <FormGroupStepOne onButtonClick={handleButtonClick}/>;
      case 1:
        return <FormGroupStepTwo onDateChange={handleDateChange}/>;
      case 2:
        return <FormGroupStepThree/>;
      default:
        return null;
    }
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
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {/*------------------step page content------------------*/}
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                {getPageContent()}

                {/*------------------buttons------------------*/}
                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, ml: 10, mr: 10}}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 2}
                    onClick={handleBack}
                    sx={{mr: 1}}
                  >
                    {activeStep === steps.length - 1 ? '' : 'Back'}
                  </Button>
                  <Box sx={{flex: '1 1 auto'}}/>
                  {activeStep !== 1 &&
                    <Button
                      disabled={!isButtonSelected()}
                      type={activeStep === 1 ? 'submit' : 'button'}
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? 'Back to group page' : 'Next'}
                    </Button>}
                  {activeStep === 1 &&
                    <Button
                      disabled={!isButtonSelected()}
                      type='submit'
                      // onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? 'Back to group page' : 'Next'}
                    </Button>}
                </Box>
              </FormProvider>

            </Box>
          </Container>
        </Main>
      </Box>
    </>

  );
}