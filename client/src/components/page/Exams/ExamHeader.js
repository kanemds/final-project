import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { api_base } from 'config'

const ExamHeader = () => {
    let navigate = useNavigate();
    const {id} = useParams();
  return (
    <>
      <Typography variant="h4">Exam Id {id}</Typography>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={() => {
          navigate(`/exams/${id}/questions`);
        }}>Questions</Button>
        <Button onClick={() => {
          navigate(`/exams/${id}/categories`);
        }}>Categories</Button>
        <Button onClick={() => {
          navigate(`/exams/${id}/properties`);
        }}>Properties</Button>
        <Button onClick={() => {
          navigate(`/exams/${id}/scheduler`);
        }}>Scheduler</Button>
      </ButtonGroup>
	</>
  )
}

export default ExamHeader;