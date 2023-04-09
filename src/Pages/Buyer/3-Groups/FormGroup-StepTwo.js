import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Card, CardContent, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

export default function FormGroupStepTwo() {
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

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {m: 1, width: '25ch'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <Stack>
          <TextField
            required
            fullWidth={true}
            id="outlined-required"
            label="Group Name"
            placeholder={'e.g. My Group'}

          /></Stack>
        <Stack>
          <TextField
            fullWidth={true}
            required
            id="outlined-required"
            label="Receiver's Name"
            placeholder={'e.g. Mary Smith'}
          /></Stack>
        <Stack>
          <TextField
            required
            fullWidth={true}
            id="outlined-required"
            label="Pickup Location"
            placeholder={'e.g. 123 Main Street, New York, NY 10001'}
          /></Stack>
        {/*<div>*/}
        <TextField
          required
          id="outlined-required"
          label="Phone Number"
          placeholder={'e.g. 123-456-7890'}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="End Date" required/>
        </LocalizationProvider>
        {/*</div>*/}

      </Box>


    </>

  );
}