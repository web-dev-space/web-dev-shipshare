import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

RHFGooglePlacesAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFGooglePlacesAutocomplete({ name, label, helperText, ...other }) {
  const { control, setValue } = useFormContext();

  // Initialize Google Places Autocomplete service
  const autocompleteService = new window.google.maps.places.AutocompleteService();

  // Fetch suggestions from the Google Places Autocomplete API
  const fetchSuggestions = async (value) => {
    return new Promise((resolve, reject) => {
      autocompleteService.getPlacePredictions({ input: value }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
          options={fetchSuggestions}
          getOptionLabel={(option) => option.description}
        />
      )}
    />
  );
}
