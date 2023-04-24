import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function DropdownList({
  selectedValue, setSelectedValue, label = "Options", options = [
    { value: "option1", displayName: 'Option 1' },
    { value: "option2", displayName: 'Option 2' },
    { value: "option3", displayName: 'Option 3' },
  ] }) {

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Options</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={selectedValue}
        onChange={handleChange}
        label={label}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.displayName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
