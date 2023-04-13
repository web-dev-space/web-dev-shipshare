import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';

const AutocompleteAddress = () => {
  const [value, setValue] = useState('');
  const [addresses, setAddresses] = useState([]);

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleOnSelect = (value) => {
    setValue(value);
  };

  const handleOnMenuVisibilityChange = (isOpen) => {
    if (isOpen) {
      // fetch addresses from API
      fetch(`AIzaSyBkloHoYMrmfcds4CgsifO5o3qPDSKgKi8?q=${value}`)
        .then((response) => response.json())
        .then((data) => setAddresses(data));
    }
  };

  return (
    <Autocomplete
      getItemValue={(address) => address.description}
      items={addresses}
      renderItem={(address) => <div key={address.place_id}>{address.description}</div>}
      value={value}
      onChange={handleOnChange}
      onSelect={handleOnSelect}
      onMenuVisibilityChange={handleOnMenuVisibilityChange}
    />
  );
};

export default AutocompleteAddress;
