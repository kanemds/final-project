import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

import { api_base } from 'config'

const PostExam = ({postInfo, setPostInfo, activate}) => {
  return (
		<Box pb={1}>
			<Paper variant="outlined">
				<Box p={2}>
					<Typography variant="h6">Post Exam</Typography>
					<Box style={{display: 'flex', justifyContent: 'space-between'}}>
						<Box style={{display: 'flex', flexDirection: 'column'}}>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>
								Feedback for Passing Grade
							</Typography>
							<TextField value={postInfo.passFeedback} onChange={(event) => setPostInfo(prev => ({...prev, passFeedback: event.target.value}))} disabled={activate} />
						</Box>
						<Box style={{display: 'flex', flexDirection: 'column'}}>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>				
								Feedback for Failing Grade
							</Typography>
							<TextField value={postInfo.failFeedback} onChange={(event) => setPostInfo(prev => ({...prev, failFeedback: event.target.value}))} disabled={activate} />
						</Box>
					</Box>
				</Box>
			</Paper>
		</Box>
  )
}

export default PostExam;