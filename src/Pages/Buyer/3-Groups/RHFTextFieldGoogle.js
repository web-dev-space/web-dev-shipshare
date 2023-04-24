import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function RHFTextFieldGoogle({ name, label,apiKey, ...other }) {
  const { control, setValue } = useFormContext();
  const [autocomplete, setAutocomplete] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteService = new window.google.maps.places.AutocompleteService({apiKey: apiKey});

  const handleInputChange = (event) => {
    const query = event.target.value;
    setValue(name, event.target.value);
    const request = {
      input: query,
      types: ['geocode'],
      componentRestrictions: { country: 'us' },
    };
    autocompleteService.getPlacePredictions(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSuggestions(results);
      }
    });
  };
  useEffect(() => {

    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      document.getElementById(`${name}-input`)
    );
    autocompleteInstance.setFields(['formatted_address', 'place_id']);
    setAutocomplete(autocompleteInstance);

    autocompleteInstance.addListener('place_changed', () => {
      const selectedPlace = autocompleteInstance.getPlace();
      const selectedAddress = selectedPlace.formatted_address;
      setValue(name, selectedAddress);
    });

    return () => {
      if (autocompleteInstance) {
        autocompleteInstance.unbindAll();
      }
    };
  }, [control, name]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...other}
          label={label}
          id={`${name}-input`}
          fullWidth
          value={field.value || ''}
          onChange={handleInputChange}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}

RHFTextFieldGoogle.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // apiKey: PropTypes.string.isRequired,
};

export default RHFTextFieldGoogle;
