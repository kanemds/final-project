import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

import { api_base } from 'config'
import { Info } from '@mui/icons-material';

const Information = ({info, setInfo}) => {
//   const {id} = useParams();
//   const [mode, modeState] = useState("Show Questions");
  return (
    <>
			<div style={{display: "flex", flexDirection: "row"}}>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Exam Name
				</Typography>
				<TextField value={info.name} onChange={(event) => setInfo(prev => ({...prev, name: event.target.value}))}/>
				{/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Exam Type
				</Typography>
				<TextField /> */}
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Passing Score
				</Typography>
				<TextField type="number" inputProps={{ inputmode: 'numeric', min: 0, max: 100}} value={info.passScore} 
					onChange={(event) => setInfo(prev => {
						const val = event.target.value;				
						const score = val === "" ? val : Number(val);
						if (score > 100) {
							return {...prev, passScore: 100};
						}
						if (score < 0) {
							return {...prev, passScore: 0};
						}
						return {...prev, passScore: score};
				})}/>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					%
				</Typography>
			</div>
			<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					General Exam Instructions ({1750 - info.instruction.length} characters remaining)
			</Typography>
			<TextField   inputProps={{ maxLength: 1750 }} value={info.instruction} onChange={(event) => setInfo(prev => ({...prev, instruction: event.target.value}))}/>
    </>
  )
}

export default Information;