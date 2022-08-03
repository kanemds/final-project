
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { api_base } from 'config'

const Header = ({questions}) => {
    let navigate = useNavigate();
    const {id, questionOrder, categoryId, questionId} = useParams();
    const deleteFunc = async () => {
      await axios.post(`${api_base}/exams/${id}/deleteQuestion`, {questionId});
      await axios.post(`${api_base}/categories/deleteQuestion`, {categoryId, questionId});
      await axios.post(`${api_base}/questions/delete`, {questionId});
      for (const answer of questions.current.answers) {
        await axios.post(`${api_base}/answers/delete`, {answerId: answer._id});
      }
    };
  return (
    <div style={{display:"flex", justifyContent:"space-around"}}>
      <div>
        <Button onClick={() => {
          navigate(`/exams/${id}/categories/${questions.current.category._id}/questions/${questions.current._id}/edit/${questionOrder}`);
        }}>Edit</Button>
        <Button onClick={() => {
          // navigate(`/exams/${id}/categories`);
        }}>Copy Question</Button>
        <Button onClick={() => {
          // navigate(`/exams/${id}/properties`);
        }}>Add Question</Button>
        <Button onClick={async() => {
          await deleteFunc();
          navigate(`/exams/${id}/questions`);
        }}>Delete</Button>
      </div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button disabled={!questions.prev} onClick={() => {
          navigate(`/exams/${id}/questions/${questions.prev._id}/${Number(questionOrder) - 1}`);
        }}>
          <ArrowBackIosIcon />
        </Button>
        <Button disabled={!questions.next} onClick={() => {
          navigate(`/exams/${id}/questions/${questions.next._id}/${Number(questionOrder) + 1}`);
        }}>
          <ArrowForwardIosIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Header;