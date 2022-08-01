import React, { useState, useEffect } from 'react'
import Link from '@mui/material/Link';
// import { Link } from 'react-router-dom';

import BasicModal from './ModalAddExam';
import { api_base } from 'config'

const Exam = ({exam}) => {
  return (
    <div>
      <Link href={`/exams/${exam._id}/questions`}>{exam.name}</Link>
    </div>
  )
}

export default Exam;