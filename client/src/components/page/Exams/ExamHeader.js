import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { api_base } from 'config'

const ExamHeader = () => {
    let navigate = useNavigate();
    const {id} = useParams();
  return (
    <div>
      <h1>Exam Id {id}</h1>
      <Button onClick={() => {
        navigate(`/exams/${id}/questions`);
      }}>Questions</Button>
      <Button onClick={() => {
        navigate(`/exams/${id}/pools`);
      }}>Pools</Button>
      <Button onClick={() => {
        navigate(`/exams/${id}/properties`);
      }}>Properties</Button>
      <Button onClick={() => {
        navigate(`/exams/${id}/scheduler`);
      }}>Scheduler</Button>
	</div>
  )
}

export default ExamHeader;