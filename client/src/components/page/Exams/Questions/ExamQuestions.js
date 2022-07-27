import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import BasicModal from './ModalAddQuestion';

import { api_base } from 'config';
import '../../../../App.css';

const ExamQuestions = () => {
//   const {id} = useParams();
//   const [mode, modeState] = useState("Show Questions");
  return (
    <>
        <BasicModal />
        Exam Questions List
    </>
  )
}

export default ExamQuestions;