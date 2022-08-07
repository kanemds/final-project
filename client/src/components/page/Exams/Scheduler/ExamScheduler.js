import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import BasicModal from '../Questions/ModalAddQuestion';

import { api_base } from 'config'

const ExamScheduler = () => {
//   const {id} = useParams();
//   const [mode, modeState] = useState("Show Questions");
  return (
    <div>
        Exam Scheduler
        // add # questions from category
        // delete # questions from category
	</div>
  )
}

export default ExamScheduler;