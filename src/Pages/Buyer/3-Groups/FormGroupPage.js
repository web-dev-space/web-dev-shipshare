import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "@mui-library/components/hook-form";
import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createShipGroupThunk,
  findAllShipGroupsThunk
} from "redux/shipGroups/shipGroups-thunks";
import * as Yup from "yup";
import FormGroupStepOne from "./FormGroup-StepOne";
import FormGroupStepThree from "./FormGroup-StepThree";
import FormGroupStepTwo from "./FormGroup-StepTwo";

const steps = ['', '', ''];
export default function FormGroupPage() {

  const [activeStep, setActiveStep] = useState(0);
  const [buttonSelected, setButtonSelected] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/groups");
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 2) {
      navigate("/groups");
      return;
    }
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
    setButtonSelected(button);
    setValue("shipRoute", button);
  };

  const handleDateChange = (date) => {
    const values = methods.getValues();
    setValue("endDate", date);
  };

  const handlePickupLocationChange = (d) => {
    console.log("d", d);
    const values = methods.getValues();
    console.log("value", values)
    setValue("pickupLocation", {...values.pickupLocation, address: d});
  };

  const isButtonSelected = () => {
    return buttonSelected !== "";
  };

  // ---------current user---------
  let currentUser = useSelector(state => state.auth.currentUser);

  if (currentUser === null) {
    currentUser = {
      role: "visitor",
      name: 'null',
      email: 'null',
    }
  }

  // ---- handle the new group object ---
  const defaultValues = {
    shipRoute: '',
    groupName: '',
    receiverName: currentUser.name,
    pickupLocation: currentUser.address ? currentUser.address : '',
    phoneNumber: currentUser.phone ? currentUser.phone : '',
    endDate: null,
  };

  // validation schema
  const NewGroupSchema = Yup.object().shape({
    groupName: Yup.string().required('Required'),
    receiverName: Yup.string().required('Required'),
    pickupLocation: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    endDate: Yup.date().required('Required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema), defaultValues,
  });

  const {handleSubmit, setValue} = methods;
  const {enqueueSnackbar} = useSnackbar();

  const onSubmit = (data) => {
    handleAddNewShipGroup(data)
    enqueueSnackbar('Group Created!');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAllShipGroupsThunk());
  }, []);

  const geocodeAddress = async (destinationAddress) => {
    return new Promise((resolve, reject) => {
      const attemptGeocode = (attemptCount) => {
        let geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({address: destinationAddress}, function (results, status) {
          if (status === window.google.maps.GeocoderStatus.OK) {
            console.log("success call google map" + status + "," + results)
            let destinationLocation = {
              latitude: results[0].geometry.location.lat(),
              longitude: results[0].geometry.location.lng()
            };
            resolve(destinationLocation);
          } else if (attemptCount < 3) {
            console.log(`Geocode request failed with status ${status}. Retrying...`);
            setTimeout(() => attemptGeocode(attemptCount + 1), 1000); //
          } else {
            resolve(9999)
          }
        });
      };
      attemptGeocode(0);
    });
  };

  const handleAddNewShipGroup = async (prop) => {
    try {
      const pickupLocationCoordinates = await geocodeAddress(prop.pickupLocation);
      const newShipGroup = {
        name: prop.groupName,
        leader: currentUser.email,
        pickupLocation: {
          name: prop.receiverName,
          address: prop.pickupLocation,
          geoLatitude: pickupLocationCoordinates.latitude,
          geoLongitude: pickupLocationCoordinates.longitude,
        },
        phoneNumber: prop.phoneNumber,
        shipRoute: prop.shipRoute,
        shipEndDate: prop.endDate,
        members: [currentUser.email]
      }
      dispatch(createShipGroupThunk(newShipGroup));
    } catch (error) {
      console.error(error);
    }
  }

  const getPageContent = () => {
    switch (activeStep) {
      case 0:
        return <FormGroupStepOne onButtonClick={handleButtonClick}/>;
      case 1:
        return <FormGroupStepTwo
          onDateChange={handleDateChange}
          onPickupLocationChange={handlePickupLocationChange}/>;
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