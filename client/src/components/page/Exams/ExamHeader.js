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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import App from 'App.css';
import { api_base } from 'config'

// <<<<<<< HEAD
// const ExamHeader = ({examName}) => {
//     let navigate = useNavigate();
//     const {id} = useParams();
//   return (
//     <>
//       <Typography variant="h4">{examName}</Typography>
//       <Box
//       sx={{
//         display: 'flex',
//         '& > *': {
//           m: 2,
//         },
//       }}
//       >
//         <Button size="large" variant="outlined" onClick={() => {
//           navigate(`/teacher/exams/${id}/questions`);
//         }}>Questions</Button>
//         <Button size="large" variant="outlined" onClick={() => {
//           navigate(`/teacher/exams/${id}/categories`);
//         }}>Categories</Button>
//         <Button size="large" variant="outlined" onClick={() => {
//           navigate(`/teacher/exams/${id}/properties`);
//         }}>Properties</Button>
//         <Button size="large" variant="outlined" onClick={() => {
//           navigate(`/teacher/exams/${id}/matrix`);
//         }}>Matrix</Button>
//         <Button size="large" variant="outlined" onClick={() => {
//           navigate(`/teacher/exams/${id}/activation`);
//         }}>Activation</Button>
//       </Box>
// 	</>
// =======
const ExamHeader = ({examName}) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const links = [
    `/teacher/exams/${id}/questions`,
    `/teacher/exams/${id}/categories`,
    `/teacher/exams/${id}/properties`,
    `/teacher/exams/${id}/matrix`,
    `/teacher/exams/${id}/activation`
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue)
    navigate(links[newValue])
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (
    <div className='selector'>
      <h1>{examName}</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Questions" {...a11yProps(0)} />
        <Tab label="Categories" {...a11yProps(1)} />
        <Tab label="Properties" {...a11yProps(2)} />
        <Tab label="Matrix" {...a11yProps(3)} />
        <Tab label="Activation" {...a11yProps(4)} />
      </Tabs>
    </div>

  )
}

export default ExamHeader;