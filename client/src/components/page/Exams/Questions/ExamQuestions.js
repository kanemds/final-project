import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams, useOutletContext } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import EmptyQuestion from '../img/EmptyQuestion.jpg';
import axios from 'axios';

import { api_base } from 'config';
// import ExamQuestion from './ExamQuestion';
import BasicModal from './ModalAddQuestion';
import QuestionsFilters from './QuestionsFilters';

const ExamQuestions = () => {
  let {id} = useParams();
  const [questions, setQuestions] = useState([]);
  const [questionsFilterState, setQuestionsFilterState] = useOutletContext();
  useEffect(() => {
    const getQuestions = async () => {
      const questionsData = await axios.get(`${api_base}/questions/exams/${id}`);
      setQuestions(_prev => questionsData.data);
    }
    getQuestions();
  }, []);
  return (
    <>
      <BasicModal questionOrder={questions.length + 1} />
      <Box>
        {questions.length === 0 && <img src={EmptyQuestion} />}
      </Box>
      {questions.length > 0 && <QuestionsFilters questions={questions} questionsFilterState={questionsFilterState} />}
    </>
  )
}

export default ExamQuestions;