import React, { useState, useEffect } from 'react'
import { useParams, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';

import ExamHeader from 'components/page/Exams/ExamHeader';
import { api_base } from 'config'

const ExamContainer = () => {
  const { id } = useParams();
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
    <Box sx={{m: 6}}>
      <ExamHeader examName={examName} />
      <br/>
      <Box>
        <Outlet context={{
          questionsFilterState, setQuestionsFilterState,
          activate, setActivate,
          setExamName
        }}
        />
      </Box>
    </Box>
    </>
  )
}

export default ExamContainer;