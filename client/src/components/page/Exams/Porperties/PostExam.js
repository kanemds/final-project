import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

import { api_base } from 'config'

const PostExam = () => {
//   const {id} = useParams();
//   const [mode, modeState] = useState("Show Questions");
  return (
    <>
			<div style={{display: "flex", flexDirection: "row"}}>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Feedback for Passing Grade
				</Typography>
				<TextField />
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>				
					Feedback for Failing Grade
				</Typography>
				<TextField />
			</div>
    </>
  )
}

export default PostExam;