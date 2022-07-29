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

import { api_base } from 'config';
import '../../../../App.css';
import useExam from '../useExam';

const ExamQuestions = () => {
  const { exam } = useExam()
  const questions = exam.questions && exam.questions.map((q) => {
    const answers = q.answers && q.answers.map((a) => {
      const correctAnswer = q.correctAnswer === a._id ? "Correct answer." : ""
      return (
        <ListItem key={a._id}>
          <ListItemButton>
            <ListItemText primary={a.content} secondary={correctAnswer}/>
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
        { answers }
      </List></>
    )
  })

  return (
    <>
        <BasicModal />
        Exam Questions List

        <List>
          { questions}
        </List>
    </>
  )
}

export default ExamQuestions;