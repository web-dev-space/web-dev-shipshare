import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card, CardContent, Stack} from "@mui/material";
import * as React from "react";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import FormProvider, {RHFAutocomplete, RHFTextField} from "../../../third-party/components/hook-form";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import RHFTextFieldGoogle from "./RHFTextFieldGoogle";

export default function FormGroupStepTwo({onDateChange, onPickupLocationChange}) {

  // ---------current user---------
  let currentUser = useSelector(state => state.auth.currentUser);
  if (currentUser === null) {
    currentUser = {
      role: "visitor"
    }
  }

  // ---- handle the new group object ---
  const defaultValues = {
    groupName: '',
    receiverName: '',
    pickupLocation: null,
    phoneNumber: '',
    endDate: '',
  };

  // validation schema
  const NewGroupSchema = Yup.object().shape({
    groupName: Yup.string().required('Required'),
    receiverName: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    endDate: Yup.string().required('Required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema), defaultValues,
  });


  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  const {handleSubmit, setValue} = methods;
  const [inputPickupLocation, setInputPickupLocation] = useState('');
  const handlePickupLocationChange = (d) => {
    // setInputPickupLocation(d)
    const values = methods.getValues();
    setValue("pickupLocation", { ...values.pickupLocation, address: d });
    onPickupLocationChange(d);
  };


  return (<>
      {/*----------------- Title & Description -----------------*/}
      <Box
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5,
        }}
      >
        <Typography
          variant="h4"
        >Enter Group Details</Typography>
        <Box
          sx={{
            width: '35%', alignItems: 'center',
          }}
        >
          <Typography
            variant="caption"
          >Please provide accurate and comprehensive information about your group
            to ensure the best possible experience for all members.</Typography>
        </Box>
      </Box>
      {/*----------------- Form -----------------*/}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Stack
          component={'form'}
          spacing={2}
          sx={{
            width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <RHFTextField
            required
            name="groupName"
            fullWidth={true}
            id="outlined-required"
            label="Group Name"
            placeholder={'e.g. My Group'}
          />
          <RHFTextField
            fullWidth={true}
            required
            name="receiverName"
            id="outlined-required"
            label="Receiver's Name"
            placeholder={'e.g. Mary Smith'}
          />
          <RHFTextFieldGoogle
            required
            fullWidth={true}
            name="pickupLocation"
            id="outlined-required"
            label="Pickup Location"
            placeholder={'e.g. 909 Kifer Rd, Sunnyvale, CA 94086, USA'}
            onChange={(location) => handlePickupLocationChange(location)}
            // apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          />
          <Stack
            direction={{sm: 'column', md: 'row'}}
            spacing={2}
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              '& > *': {
                flex: 1,
              },
            }}
          >
            <RHFTextField
              required
              fullWidth={true}
              name="phoneNumber"
              id="outlined-required"
              label="Phone Number"
              placeholder={'e.g. 123-456-7890'}
            />

            <LocalizationProvider
              dateAdapter={AdapterDayjs}>
              <DatePicker
                required
                name="endDate"
                label="End Date *"
                value={selectedDate ? dayjs(selectedDate) : null}
                minDate={dayjs()}
                onChange={(date) => handleDateChange(date)}
                renderInput={(props) => (
                  <TextField {...props}/>
                )}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
      </div>


    </>

  );
}