import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import BasicModal from './ModalAddQuestion';

import { api_base } from 'config'
import QuestionForm from './QuestionForm/QuestionForm';

const ExamQuestionsNew = () => {
  const {id, questionOrder} = useParams();
//   const [mode, modeState] = useState("Show Questions");
  return (
    <>
      <QuestionForm />
    </>
  )
}

export default ExamQuestionsNew;