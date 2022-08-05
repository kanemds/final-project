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

const ExamQuestion = ({questionOrder, question}) => {
  let {id} = useParams();
  return (
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
      <h3>{questionOrder}</h3>
      <Link href={`${api_base}/exams/${id}/questions/${question._id}/${questionOrder}`}>{question.content}</Link>
      <span>{question.category.content}</span>
    </div>
  )
}

export default ExamQuestion;