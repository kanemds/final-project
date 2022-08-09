import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
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
  const [info, setInfo] = useState({name: "", instructions: "", passScore: ""});
  const [postInfo, setPostInfo] = useState({passFeedback: "", failFeedback: ""});
  const [trigger, setTrigger] = useState(false);
  const cancelLink = `/exams/${id}/questions`;
  useEffect(() => {
    const getExam = async () => {
      const examData = await axios.get(`${api_base}/exams/${id}/properties`);
      const exam = examData.data;
      setInfo(_prev => ({name: exam.name, instructions: exam.instructions, passScore: exam.passScore}));
      setPostInfo(_prev => ({passFeedback: exam.passFeedback, failFeedback: exam.failFeedback}));
    }
    getExam();
  }, []);
  const updateFunc = async () => {
    await axios.post(`${api_base}/exams/${id}/properties`, 
      {
        name: info.name, instructions: info.instructions, passScore: info.passScore, 
        passFeedback: postInfo.passFeedback, failFeedback: postInfo.failFeedback
      }
    );
    setExamName(_prev => info.name);
    setTrigger(_prev => true);
  };
  return (
    <>
      {trigger && <h2 color={blue}>Successful!</h2>}
      <h3>Exam Properties</h3>
      <Information info={info} setInfo={setInfo}/>
      <br/>
      <h3>Post Exam</h3>
      <PostExam postInfo={postInfo} setPostInfo={setPostInfo} />
      <Button component={Link} to={cancelLink}>Cancel</Button>
      <Button onClick={async () => await updateFunc()}>Update</Button>
    </>
  )
}

export default ExamProperties;