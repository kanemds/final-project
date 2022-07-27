import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { useParams, Link } from "react-router-dom";

import { api_base } from 'config'
import Information from './Information';
import PostExam from './PostExam';

const ExamProperties = () => {
  const {id} = useParams();
  const [info, setInfo] = useState({name: "", passScore: "", instruction: ""});
  const [postInfo, setPostInfo] = useState("");
  const cancelLink = `/exams/${id}/questions`;
  return (
    <>
      <h3>Exam Properties</h3>
      <Information info={info} setInfo={setInfo}/>
      <br/>
      <h3>Post Exam</h3>
      <PostExam />
      <Button component={Link} to={cancelLink}>Cancel</Button>
      <Button onClick={() => alert(`${info.name} - ${info.passScore} - ${info.instruction}`)}>Update</Button>
    </>
  )
}

export default ExamProperties;