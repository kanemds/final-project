import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { api_base } from 'config'

const ExamHeader = ({examName}) => {
    let navigate = useNavigate();
    const {id} = useParams();
  return (
    <>
      <Typography variant="h4">{examName}</Typography>
      <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 2,
        },
      }}
      >
        <Button size="large" variant="outlined" onClick={() => {
          navigate(`/teacher/exams/${id}/questions`);
        }}>Questions</Button>
        <Button size="large" variant="outlined" onClick={() => {
          navigate(`/teacher/exams/${id}/categories`);
        }}>Categories</Button>
        <Button size="large" variant="outlined" onClick={() => {
          navigate(`/teacher/exams/${id}/properties`);
        }}>Properties</Button>
        <Button size="large" variant="outlined" onClick={() => {
          navigate(`/teacher/exams/${id}/matrix`);
        }}>Matrix</Button>
        <Button size="large" variant="outlined" onClick={() => {
          navigate(`/teacher/exams/${id}/activation`);
        }}>Activation</Button>
      </Box>
	</>
  )
}

export default ExamHeader;