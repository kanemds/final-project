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

const QuestionOperations = () => {
	// const [question, setQuestion] = useState();
	// useEffect(() => {
  //   const getQuestion = async () => {
  //     const ques = await axios.get(`${api_base}/questions/${questionId}`);
  //     setCatsOptions(_prev => ques.data);
  //   }
  //   getQuestion();
  // }, []);
  return (
    <>
			QuestionOperations
		</>
  )
}

export default QuestionOperations;