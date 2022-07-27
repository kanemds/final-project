import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';

import BasicModal from './ModalAddExam';

import { api_base } from 'config'
import useExams from './useExams'

const Exams = () => {
  const exams = useExams();
  return (
    <>
      <h1>Exam Manager</h1>
      <BasicModal />
      {exams.map(exam => {
        return <div key={exam._id}>{exam.name}</div>
      })}
    </>
  )
}

export default Exams