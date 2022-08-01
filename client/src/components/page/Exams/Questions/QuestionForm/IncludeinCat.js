import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import { api_base } from 'config'
import BasicModal from './ModalAddCategory';
import CategorySelect from './CategorySelect';

const IncludeinCat = ({catsOptions, setCatsOptions, checkedCat, setCheckedCat, catSelected, setCatSelected}) => {
	// let {id} = useParams();
    return (
			<div>
			  <FormControlLabel
          value="start"
          control={
					<Switch
						checked={checkedCat}
						onChange={async() => setCheckedCat(prev => prev ? false : true)}
						inputProps={{ 'aria-label': 'controlled' }}
					/>}
          label='Include This Question In A Category'
          labelPlacement="start"
        />
				{checkedCat && catsOptions.length > 1 && 
					<div>
						<CategorySelect catSelected={catSelected} setCatSelected={setCatSelected} catsOptions={catsOptions} />
						<div>
							or
						</div>
					</div>	
				}
				{checkedCat && <BasicModal />}
			</div>
    );
};

export default IncludeinCat;