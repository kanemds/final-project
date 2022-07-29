import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';

import BasicModal from './ModalAddExam';
import { Link } from 'react-router-dom'
import { api_base } from 'config'
import useExams from './useExams'

const Exams = () => {
  const exams = useExams();
  return (
    <>
      <h1>Exam Manager</h1>
      <BasicModal />
      {exams.map(exam => {
        return <div key={exam._id}><Link to={`/exams/${exam._id}/questions`}>{exam.name}</Link></div>
      })}
    </>
  )
}

export default Exams