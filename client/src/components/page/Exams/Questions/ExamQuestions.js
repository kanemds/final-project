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
import BasicModal from './ModalAddQuestion';
import QuestionsFilters from './QuestionsFilters';

const ExamQuestions = () => {
<<<<<<< HEAD
  let {id} = useParams();
  const [questions, setQuestions] = useState([]);
  const {questionsFilterState, activate} = useOutletContext();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const getQuestions = async () => {
      const questionsData = await axios.get(`${api_base}/exams/${id}/questions`);
      setQuestions(_prev => questionsData.data);
      setLoad(_prev => false);
    }
    getQuestions();
  }, []);
  return (
    <>
      <BasicModal questionOrder={questions.length + 1} activate={activate} />
      <Box>
        {load && <h1>Loading</h1>}
      </Box>
      <Box>
        {!load && questions.length === 0 && <img src={EmptyQuestion} />}
      </Box>
      <Box>
      {!load && questions.length > 0 && <QuestionsFilters questions={questions} questionsFilterState={questionsFilterState} />}
      </Box>
=======
  const { exam } = useExam()
  const questions = exam.questions && exam.questions.map((q) => {
    const answers = q.answers && q.answers.map((a) => {
      const correctAnswer = q.correctAnswer === a._id ? "Correct answer." : ""
      return (
        <ListItem key={a._id}>
          <ListItemButton>
            <ListItemText primary={a.content} secondary={correctAnswer} />
          </ListItemButton>
        </ListItem>
      )
    })
    return (<>
      <ListItem key={q._id}>
        <ListItemButton>
          <ListItemText primary={q.content} />
        </ListItemButton>
      </ListItem>
      <List sx={{ pl: 4 }}>
        {answers}
      </List></>
    )
  })

  return (
    <>
      <BasicModal />
      Exam Questions List

      <List>
        {questions}
      </List>
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
    </>
  )
}

export default ExamQuestions;