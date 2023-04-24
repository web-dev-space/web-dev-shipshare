import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui/lab
import { DatePicker } from '@mui/lab';
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFDatePicker({name, helperText, ...other}) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!error}
                helperText={error ? error?.message : helperText}
              />
            )}
            {...other}
          />
        </LocalizationProvider>
      )}
    />
  );
}


