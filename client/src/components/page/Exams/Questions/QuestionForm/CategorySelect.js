import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CategorySelect({catSelected, setCatSelected, catsOptions}) {
  const handleChange = (event) => {
    setCatSelected(event.target.value);
  };
  return (
      <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
        <InputLabel id="demo-simple-select-label">Select a Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={catSelected}
          label="Select a Category"
          onChange={handleChange}
        >
					{catsOptions.map((catsOption, i) => {
						if (catsOption.content !== 'No Category Assigned') {
							return <MenuItem key ={i + 1} value={catsOption._id}>{catsOption.content}</MenuItem>
						}
					})}
        </Select>
      </FormControl>
  );
}
