import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import BasicModal from '../Questions/ModalAddQuestion';


import { api_base } from 'config'

const ExamPools = () => {
//   const {id} = useParams();
//   const [mode, modeState] = useState("Show Questions");
  return (
    <>
      Exam Pools
    </>
  )
}

export default ExamPools;