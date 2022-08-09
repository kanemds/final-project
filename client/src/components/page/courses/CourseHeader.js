import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useTeacherCourses from './useTeacherCourses';
import App from 'App.css';
import { api_base } from 'config'

const CourseHeader = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const links = [
    `/teacher/courses/${id}/edit`,
    `/teacher/courses/${id}/addexams`,
    `/teacher/courses/${id}/addstudents`
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
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Edit Course" {...a11yProps(0)} />
        <Tab label="Edit Exams" {...a11yProps(1)} />
        <Tab label="Edit Students" {...a11yProps(2)} />

      </Tabs>
    </div>
  )
}

export default CourseHeader;