import React, { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';

import { Link } from 'react-router-dom'
import { api_base } from 'config'
import { LoginContext } from 'Contexts/LoginContext';

const Records = () => {
  const { teacherId } = useContext(LoginContext);
  useEffect(() => {
    const getScores = async () => {
      const scores = await axios.get(`${api_base}/courses/${teacherId}`);
      console.log(scores.data, 'score.data######')
      // setScoresState(_prev => scores.data);
    }
    getScores();
  }, []);
  return (
    <>
        Reports
    </>
  )
}

export default Records;