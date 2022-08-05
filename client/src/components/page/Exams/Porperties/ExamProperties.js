import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import { api_base } from 'config'
import Information from './Information';
import PostExam from './PostExam';

const ExamProperties = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState({name: "", instructions: "", passScore: ""});
  const [postInfo, setPostInfo] = useState({passFeedback: "", failFeedback: ""});
  const cancelLink = `/exams/${id}/questions`;
  const save = async () => {
    await axios.post(`${api_base}/exams/${id}/properties`, 
      {
        name: info.name, instructions: info.instructions, passScore: info.passScore, 
        passFeedback: postInfo.passFeedback, failFeedback: postInfo.failFeedback
      }
    );
    navigate(`/exams/${id}/questions`);
  };
  return (
    <>
      <h3>Exam Properties</h3>
      <Information info={info} setInfo={setInfo}/>
      <br/>
      <h3>Post Exam</h3>
      <PostExam postInfo={postInfo} setPostInfo={setPostInfo} />
      <Button component={Link} to={cancelLink}>Cancel</Button>
      <Button onClick={async () => await save()}>Update</Button>
    </>
  )
}

export default ExamProperties;