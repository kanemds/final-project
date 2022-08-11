import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';

import BasicModal from './ModalAddExam';
import { Link } from 'react-router-dom'
import { api_base } from 'config'
import useExams from './useExams'
import Exam from './Exam'
import axios from 'axios';

const Reports = () => {
  const [scoresState, setScoresState] = useState([]);
  const [rowsState, setRowsState] = useState([]);
  useEffect(() => {
    const getScores = async () => {
      const scores = await axios.get(`${api_base}/teacher/${teacherId}/exams/scores`);
      setScoresState(_prev => scores.data);
    }
    getScores();
  }, []);
  return (
    <>
    Scores Filters Table
    </>
  )
}

export default Reports;