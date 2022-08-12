import React, { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';

import { Link } from 'react-router-dom'
import { api_base } from 'config'
import { LoginContext } from 'Contexts/LoginContext';

const Records = () => {
  const [scoresState, setScoresState] = useState([]);
  const [rowsState, setRowsState] = useState([]);
  const { teacherId } = useContext(LoginContext);
  useEffect(() => {
    const getScores = async () => {
      const scores = await axios.get(`${api_base}/teacher/${teacherId}/reports/records`);
      console.log(scores.data, 'score.data######')
      // setScoresState(_prev => scores.data);
    }
    getScores();
  }, []);
  return (
    <>
    Scores Filters Table
    </>
  )
}

export default Records;