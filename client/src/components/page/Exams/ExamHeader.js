import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import App from 'App.css';
import { api_base } from 'config'

const ExamHeader = () => {
  let navigate = useNavigate();
  const {id} = useParams();
  const [value, setValue] = React.useState(0);
  const links = [
    `/teacher/exams/${id}/questions`,
    `/teacher/exams/${id}/pools`,
    `/teacher/exams/${id}/properties`,
    `/teacher/exams/${id}/scheduler`
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
      <h1>Exam Id {id}</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Questions" {...a11yProps(0)} />
        <Tab label="Pools" {...a11yProps(1)} />
        <Tab label="Properties" {...a11yProps(2)} />
        <Tab label="Scheduler" {...a11yProps(3)} />
      </Tabs>
	</div>
  )
}

export default ExamHeader;