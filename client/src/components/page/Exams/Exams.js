import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';

import BasicModal from './ModalAddExam';
import { Link } from 'react-router-dom'
import { api_base } from 'config'
import useExams from './useExams'
import Exam from './Exam'
import axios from 'axios';

const Exams = () => {
  // const exams = useExams();
  const [examsState, setExamsState] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      const exams = await axios.get(`${api_base}/exams`);
      setExamsState(_prev => exams.data);
    }
    getExams();
  }, []);
  return (
    <>
      <h1>Exam Manager</h1>
      <BasicModal setExamsState={setExamsState}/>
      <div>
        {examsState.length > 0 && examsState.map((exam, i) => {
          return <Exam key={i + 1} exam={exam} />
        })}
      </div>
    </>
  )
}

export default Exams