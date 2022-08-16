import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import { api_base } from 'config';
import Header from './Header';

const QuestionOperations = () => {
  let {id, categoryId, questionId, questionOrder} = useParams();
	const [questionsState, setQuestionsState] = useState({});
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
	useEffect(() => {
    const getQuestion = async () => {
      const questionsData = await axios.get(`${api_base}/exams/${id}/questions`);
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
  }, [questionId]);
  return (
    <>
      {
        questionsState.current && 
        <>
          <Header questions={questionsState} setQuestions={setQuestionsState} />
          <Card sx={{ minWidth: 50, margin: 1}}>
            <CardContent>
              <Box style={{display: 'flex', flexDirection: 'column', gap: '1vw'}}>
                <Box style={{display: 'flex', gap: '2vw'}}>
                  <Typography variant="h6">
                    Points: {questionsState.current.points}
                  </Typography>
                  <Typography variant="h6">
                    Category: {questionsState.current.category.content}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 20 }}>
                    Question {questionOrder}: {questionsState.current.content}?
                  </Typography>
                </Box>
              </Box>
              <br/>
              {questionsState.current.answers?.map((ans, i) => {
                return <Typography sx={{ fontSize: 20 }} key={i + 1}>{letters[i]}. {ans.content}</Typography>
              })}
            </CardContent>
          </Card>
        </>
      }
		</>
  )
}

export default QuestionOperations;