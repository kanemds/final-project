import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { api_base } from 'config'
import QuestionEditForm from '../QuestionForm/QuestionEditForm';

const QuestionEdit = () => {
  // const {id, questionId} = useParams();
//   const [mode, modeState] = useState("Show Questions");
  return (
    <>
      <QuestionEditForm />
    </>
  )
}

export default QuestionEdit;