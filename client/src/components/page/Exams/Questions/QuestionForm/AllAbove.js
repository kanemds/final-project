import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import NativeSelect from '@mui/material/NativeSelect';

const AllAbove = ({letter, checkedAllAbove, setCheckedAllAbove, setAboveSelected}) => {
    return (
			<div>
			  <FormControlLabel
          value="start"
          control={
					<Switch
						checked={checkedAllAbove}
						onChange={() => setCheckedAllAbove(prev => prev ? false : true)}
						inputProps={{ 'aria-label': 'controlled' }}
					/>}
          label={letter}
          labelPlacement="start"
        />
				<NativeSelect defaultValue="All of the Above" onChange={event => setAboveSelected(_prev => event.target.value)}>
					<option value="All of the Above">All of the Above</option>
					<option value="None of the Above">None of the Above</option>
				</NativeSelect>
			</div>
    );
};

export default AllAbove;