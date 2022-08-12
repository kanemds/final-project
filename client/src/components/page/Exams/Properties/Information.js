import React, { useState, useEffect } from 'react'
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import { red } from '@mui/material/colors';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { api_base } from 'config';


const Information = ({info, setInfo, activate}) => {
  return (
		<Box pb={1}>
			<Paper variant="outlined">
				<Box p={2} style={{display: 'flex', flexDirection: 'column', gap: "1.5vw"}}>
					<Typography variant="h6">Exam Properties</Typography>
					<Box style={{display: 'flex', gap: "8vw"}}>
					<Box style={{display: 'flex', gap: "1.5vw"}}>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<AcUnitRoundedIcon sx={{ color: red[500] }}/> Exam Name 
						</Typography>
						<TextField disabled={activate} value={info.name} onChange={(event) => setInfo(prev => ({...prev, name: event.target.value}))}/>
					</Box>
					<Box style={{display: 'flex', gap: "1.5vw"}}>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<AcUnitRoundedIcon sx={{ color: red[500] }}/> Passing Score
						</Typography>
						<TextField disabled={activate} type="number" inputProps={{ inputMode: 'numeric', min: 0, max: 100}} value={info.passScore} 
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
					</Box>
				</Box>
					<Box style={{display: 'flex', gap: "6.7vw"}}>
					<Box style={{display: 'flex', gap: "1.5vw"}}>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Attempts Limit
						</Typography>
						<TextField disabled={activate} type="number" inputProps={{ inputMode: 'numeric', min: 0 }} value={info.attemptsLimit} 
							onChange={(event) => setInfo(prev => {
								const val = event.target.value;			
								const attempts = val === "" ? "" : Number(val);
								if (attempts < 0) {
									return {...prev, attemptsLimit: 0};
								}
								return {...prev, attemptsLimit: attempts};
						})}/>
					</Box>
					<Box style={{display: 'flex', gap: "1.5vw"}}>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Time Limit
						</Typography>
						<TextField disabled={activate} type="number" inputProps={{ inputMode: 'numeric', min: 0 }} value={info.timeLimit} 
							onChange={(event) => setInfo(prev => {
								const val = event.target.value;		
								const time = val === "" ? "" : Number(val);
								if (time < 0) {
									return {...prev, timeLimit: 0};
								}
								return {...prev, timeLimit: time};
						})}/>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Minutes
						</Typography>
					</Box>
				</Box>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					<AcUnitRoundedIcon sx={{ color: red[500] }}/> General Exam Instructions ({1750 - info.instructions.length} characters remaining)
					</Typography>
					<TextField multiline rows={4} fullWidth disabled={activate} inputProps={{ maxLength: 1750 }} value={info.instructions} onChange={(event) => setInfo(prev => ({...prev, instructions: event.target.value}))}/>
				</Box>
			</Paper>
		</Box>
  )
}

export default Information;