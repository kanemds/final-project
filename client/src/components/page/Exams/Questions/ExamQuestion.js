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
import Link from '@mui/material/Link';

import { api_base } from 'config';

const ExamQuestion = ({question}) => {
  let {id} = useParams();
  return (
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
      <h3>{question.order}</h3>
      <Link href={`${api_base}/exams/${id}/questions/${question._id}`}>{question.content}</Link>
      <span>{question.catName}</span>
    </div>
  )
}

export default ExamQuestion;

// http://localhost:3000/exams/62e830db0ad4b1ffa60b4450/questions/62e830db0ad4b1ffa60b4452/62e837a70ad4b1ffa60b4483