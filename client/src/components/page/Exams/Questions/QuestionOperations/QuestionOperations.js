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
import Header from './Header';

const QuestionOperations = () => {
  let {id, categoryId, questionId, questionOrder} = useParams();
	const [questionsState, setQuestionsState] = useState({});
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
	useEffect(() => {
    const getQuestion = async () => {
      const questionsData = await axios.get(`${api_base}/questions/exams/${id}`);
      const questions = questionsData.data;
      const currentState = {
        prev: questions[questionOrder - 2],
        current: questions[questionOrder - 1],
        next: questions[questionOrder],
        questionsCt: questions.length
      };
      setQuestionsState(currentState);
    }
    getQuestion();
    console.log(questionsState, 'questionsState#####')
  }, [questionId]);
  return (
    <>
      {
        questionsState.current && 
        <>
          <Header questions={questionsState} setQuestions={setQuestionsState} />
          <div style={{display:'flex', flexDirection:'column'}}>
            <span>Points: 2 Category: {questionsState.current.category.content}</span>
            <span>Question {questionOrder}: {questionsState.current.content}?</span>
          </div>
          {questionsState.current.answers?.map((ans, i) => {
            return <span key={i + 1}>{letters[i]}. {ans.content}</span>
          })}
        </>
      }
		</>
  )
}

export default QuestionOperations;