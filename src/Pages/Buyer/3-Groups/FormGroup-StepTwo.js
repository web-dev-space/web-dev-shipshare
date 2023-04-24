import { yupResolver } from "@hookform/resolvers/yup";
import { RHFTextField } from "@mui-library/components/hook-form";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import RHFTextFieldGoogle from "./RHFTextFieldGoogle";

export default function FormGroupStepTwo({onDateChange, onPickupLocationChange}) {

  // ---------current user---------
  let currentUser = useSelector(state => state.auth.currentUser);
  if (currentUser === null) {
    currentUser = {
      role: "visitor"
    }
  }
  // console.log("currentUser", currentUser)

  // ---- handle the new group object ---
  const defaultValues = {
    groupName: '',
    receiverName: '',
    pickupLocation: null,
    phoneNumber: '',
    endDate: null,
  };

  // validation schema
  const NewGroupSchema = Yup.object().shape({
    groupName: Yup.string().required('Required'),
    receiverName: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    endDate: Yup.date().required('Required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema), defaultValues,
  });


  const [selectedDate, setSelectedDate] = useState(null);


  const handleDateChange = (date) => {
    onDateChange(date);
    setSelectedDate(date);

  };

  const {handleSubmit, setValue} = methods;
  const handlePickupLocationChange = (d) => {
    const values = methods.getValues();
    setValue("pickupLocation", {...values.pickupLocation, address: d});
    onPickupLocationChange(d);
  };

  const {control} = useFormContext();

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
            width: {xs: '70%', sm: '50%', md: '35%', lg: '35%', xl: '35%', xxl: '35%'},
            alignItems: 'center',
            textAlign: 'center',

          }}
        >
          <Typography
            variant="caption"
          >Please provide accurate and comprehensive information about your group
            to ensure the best possible experience for all members.</Typography>
        </Box>
      </Box>
      {/*----------------- Form -----------------*/}
      <Box

        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Stack
          component={'form'}
          spacing={2}
          sx={{
            width: {xs: '90%', sm: '80%', md: '70%', lg: '55%', xl: '55%', xxl: '50%'},
            display: 'flex', flexDirection: 'column', alignItems: 'center',
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
          />
          <Stack
            direction={{xs: "column", sm: 'column', md: 'row'}}
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
              style={{marginBottom: 15}}
            />
            <Controller
              name='endDate'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    name="endDate"
                    label="End Date *"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    minDate={dayjs()}
                    helperText={error ? error.message : "Required"}
                    error={!!error}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                    onChange={(date) => handleDateChange(date)}
                  />
                </LocalizationProvider>
              )}
            />
          </Stack>
        </Stack>
      </Box>


    </>

  );
}