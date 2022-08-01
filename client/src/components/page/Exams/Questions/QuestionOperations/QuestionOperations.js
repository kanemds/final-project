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
	const [question, setQuestion] = useState({});
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
	useEffect(() => {
    const getQuestion = async () => {
      const questionData = await axios.get(`${api_base}/questions/${categoryId}/${questionId}`);
      console.log(questionData.data[0], '####')
      setQuestion(_prev => questionData.data[0]);
    }
    getQuestion();
  }, []);
  return (
    <>
      <Header />
      {question.content}
      {question.answers?.map((ans, i) => {
        return <div key={i + 1} style={{display:'flex', justifyContent:'space-around'}}>
          <span>{letters[i]}</span>
          <span>{ans.content}</span>
        </div>
      })}
		</>
  )
}

export default QuestionOperations;