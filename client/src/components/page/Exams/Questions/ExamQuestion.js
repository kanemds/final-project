import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BasicModal from './QuestionForm/ModalAddQuestion';

import { api_base } from 'config';

const ExamQuestion = ({question}) => {
  return (
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
      <h3>{question.order}</h3>
			<span>{question.content}</span>
      <span>{question.catName}</span>
    </div>
  )
}

export default ExamQuestion;