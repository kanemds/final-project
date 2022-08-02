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
  let {id, categoryId, questionId} = useParams();
	const [questions, setQuestions] = useState({});
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
	useEffect(() => {
    const getQuestion = async () => {
      const questionsData = await axios.get(`${api_base}/questions/exams/${id}`);
      let nextOrder;
      let prevOrder;
      const currentState = {};
      for(const que of questionsData.data) {
        if (que._id === questionId) {
          currentState.current = que;
          nextOrder = que.order + 1;
          prevOrder = que.order - 1;
          break;
        }
      }
      for(const que of questionsData.data) {
        if (que.order === nextOrder) {
          currentState.next = que;
        } else if (que.order === prevOrder) {
          currentState.prev = que;
        }  
      }
      setQuestions(currentState);
    }
    getQuestion();
  }, [questionId]);
  return (
    <>
      {
        questions.current && 
        <>
          <Header questions={questions} setQuestions={setQuestions} />
          <div style={{display:'flex', flexDirection:'column'}}>
            <span>Points: 2 Category: {questions.current.catName}</span>
            <span>Question {questions.current.order}: {questions.current.content}?</span>
          </div>
          {questions.current.answers?.map((ans, i) => {
            return <span key={i + 1}>{letters[i]}. {ans.content}</span>
          })}
        </>
      }
		</>
  )
}

export default QuestionOperations;