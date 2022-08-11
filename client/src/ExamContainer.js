import React, { useState, useEffect } from 'react'
import { useParams, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import axios from 'axios';

import ExamHeader from 'components/page/Exams/ExamHeader';
import Sidebar from 'components/Sidebar';
<<<<<<< HEAD

import { api_base } from 'config'
=======
import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9

const ExamContainer = () => {
  const {id} = useParams();
  const [questionsFilterState, setQuestionsFilterState] = useState({});
  const [activate, setActivate] = useState(false);
  const [examName, setExamName] = useState('');
  useEffect(() => {
    const getExam = async () => {
      const examData = await axios.get(`${api_base}/exams/${id}`);
      setExamName(_prev => examData.data.name);
      setActivate(_prev => examData.data.activate);
    }
    getExam();
  }, []);
  return (
    <>
<<<<<<< HEAD
      <ExamHeader examName={examName} />
      <Box sx={{ bgcolor: 'white', p: 3 }}>
        <Outlet context={{
          questionsFilterState, setQuestionsFilterState,
          activate, setActivate,
          setExamName
          }} 
        />
=======
      <ExamHeader />
      <Box sx={{ bgcolor: 'white', p: 3 }}>
        <Outlet />
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
      </Box>
    </>
  )
}

export default ExamContainer;