import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

import { api_base } from 'config';
// import ExamQuestion from './ExamQuestion';
import BasicModal from './ModalAddQuestion';
import QuesitonsFilters from './QuestionsFilters';

const ExamQuestions = () => {
  let {id} = useParams();
  const [questions, setQuestions] = useState([]);
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
      {questions.length > 0 && <QuesitonsFilters questions={questions} />}
      {/* {questions.length > 0 && questions.map((ques, i) => {
        return <ExamQuestion key={i + 1} questionOrder={i + 1} question={ques} />
      })} */}
    </>
  )
}

export default ExamQuestions;