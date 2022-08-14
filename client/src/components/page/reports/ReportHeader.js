import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

import { api_base } from 'config';

const ReportHeader = () => {
  let navigate = useNavigate();
  const { courseId, examId } = useParams();
  const [value, setValue] = React.useState(0);
  const [names, setNames] = useState({});
  useEffect(() => {
    const getNames= async () => {
      const course = await axios.get(`${api_base}/course/${courseId}`);
      const exam = await axios.get(`${api_base}/exams/${examId}`);
      setNames(_prev => ({courseName: course.data.name, examName: exam.data.name}));
    }
    getNames();
  }, []);
  const links = [
    `/teacher/reports/${courseId}/${examId}/scores`,
    `/teacher/reports/${courseId}/${examId}/questions`
  ]
  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(links[newValue])
  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  return (
    <>
      <Typography variant="h5">Course: {names.courseName}</Typography>
      <Typography variant="h5">Exam: {names.examName}</Typography>
      <div className='selector'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Scores" {...a11yProps(0)} />
          <Tab label="Questions" {...a11yProps(1)} />
        </Tabs>
      </div>
    </>  
  )
}

export default ReportHeader;