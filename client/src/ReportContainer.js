import React, { useState, useEffect } from 'react'
import { useParams, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import axios from 'axios';

import Sidebar from 'components/Sidebar';

import { api_base } from 'config'
import ReportHeader from 'components/page/reports/ReportHeader';

const ExamContainer = () => {
//   const {id} = useParams();
//   const [questionsFilterState, setQuestionsFilterState] = useState({});
//   const [activate, setActivate] = useState(false);
//   const [examName, setExamName] = useState('');
//   useEffect(() => {
//     const getExam = async () => {
//       const examData = await axios.get(`${api_base}/exams/${id}`);
//       setExamName(_prev => examData.data.name);
//       setActivate(_prev => examData.data.activate);
//     }
//     getExam();
//   }, []);
  return (
    <>
      <ReportHeader />
      {/* <Box sx={{ bgcolor: 'white', p: 3 }}>
        <Outlet context={{
          questionsFilterState, setQuestionsFilterState,
          activate, setActivate,
          setExamName
          }} 
        />
      </Box> */}
      <Outlet />
    </>
  )
}

export default ExamContainer;