import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactDOM from "react-dom";
import { useParams, Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from 'axios';

import { api_base } from 'config'
import Information from './Information';
import PostExam from './PostExam';
import { blue } from '@mui/material/colors';

const ExamProperties = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {setExamName} = useOutletContext();
  const [info, setInfo] = useState({name: "", timeLimit: "", attemptsLimit: "", instructions: "", passScore: ""});
  const [postInfo, setPostInfo] = useState({passFeedback: "", failFeedback: ""});
  const [trigger, setTrigger] = useState(false);
  const {activate} = useOutletContext();
  const cancelLink = `/teacher/exams/${id}/questions`;
  useEffect(() => {
    const getExam = async () => {
      const examData = await axios.get(`${api_base}/exams/${id}/properties`);
      const exam = examData.data;
      setInfo(_prev => ({name: exam.name, timeLimit: exam.timeLimit / 60000 || '', attemptsLimit: exam.attemptsLimit || '', 
        instructions: exam.instructions, passScore: exam.passScore}));
      setPostInfo(_prev => ({passFeedback: exam.passFeedback, failFeedback: exam.failFeedback}));
    }
    getExam();
  }, []);
  const updateFunc = async () => {
    await axios.post(`${api_base}/exams/${id}/properties`, 
      {
        name: info.name, 
        attemptsLimit: info.attemptsLimit, 
        timeLimit: info.timeLimit * 60000, 
        instructions: info.instructions, 
        passScore: info.passScore, 
        passFeedback: postInfo.passFeedback, 
        failFeedback: postInfo.failFeedback
      }
    );
    setExamName(_prev => info.name);
    setTrigger(_prev => true);
  };
  return (
    <>
      {trigger && <Typography variant="h3">Successful!</Typography>}
      <Information info={info} setInfo={setInfo} activate={activate} />
      <br/>
      <PostExam postInfo={postInfo} setPostInfo={setPostInfo} activate={activate} />
      <Box style={{display: 'flex', justifyContent: 'center'}}>
        <Button variant="contained" component={Link} to={cancelLink} disabled={activate}>Cancel</Button>
        <Button variant="contained" onClick={updateFunc} disabled={activate}>Update</Button>
      </Box>
    </>
  )
}

export default ExamProperties;