import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';

const AllAbove = ({letter, checkedAllAbove, setCheckedAllAbove, aboveSelected, setAboveSelected, setAnswers}) => {
    return (
			<Box>
			  <FormControlLabel
          control={
					<Switch
						checked={checkedAllAbove}
						onChange={() => setCheckedAllAbove(prev => {
							if (prev) {
								setAnswers(prev => {
									const newPrev = [...prev];
									newPrev[newPrev.length - 1] = '';
									return newPrev;
								})
								return false;
							} else {
								setAnswers(prev => {
									const newPrev = [...prev];
									newPrev[newPrev.length - 1] = aboveSelected;
									return newPrev;
								});
								return true;
							}
						})}
						inputProps={{ 'aria-label': 'controlled' }}
					/>}
          label={<h4>{letter}</h4>}
          labelPlacement="start"
        />
				<NativeSelect defaultValue="All of the Above" onChange={event => setAboveSelected(_prev => event.target.value)}>
					<option value="All of the Above">All of the Above</option>
					<option value="None of the Above">None of the Above</option>
				</NativeSelect>
			</Box>
    );
};

export default AllAbove;