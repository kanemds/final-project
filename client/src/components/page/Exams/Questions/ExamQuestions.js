import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BasicModal from './ModalAddQuestion';
import axios from 'axios';

import { api_base } from 'config';
import ExamQuestion from './ExamQuestion';

const ExamQuestions = () => {
  let {id} = useParams();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const questionsData = await axios.get(`${api_base}/questions/exams/${id}`);
      setQuestions(_prev => {
        const orderedQuestions = [];
        questionsData.data.forEach(que => {
          orderedQuestions[que.order - 1] = que;
        });
        return orderedQuestions;
      });
    }
    getQuestions();
  }, []);
  return (
    <>
        <BasicModal questionOrder={questions.length + 1} />
        {questions.length > 0 && questions.map((ques, i) => {
          return <ExamQuestion key={i + 1} question={ques} />
        })}
    </>
  )
}

export default ExamQuestions;