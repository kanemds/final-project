
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { api_base } from 'config'

const Header = ({questions}) => {
    let navigate = useNavigate();
    const {id, questionOrder} = useParams();
  return (
    <div style={{display:"flex", justifyContent:"space-around"}}>
      <div>
        <Button onClick={() => {
          navigate(`/exams/${id}/categories/${questions.current.catId}/questions/${questions.current._id}/edit`);
        }}>Edit</Button>
        <Button onClick={() => {
          // navigate(`/exams/${id}/categories`);
        }}>Copy Question</Button>
        <Button onClick={() => {
          // navigate(`/exams/${id}/properties`);
        }}>Add Question</Button>
        <Button onClick={() => {
          // navigate(`/exams/${id}/scheduler`);
        }}>Delete</Button>
      </div>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button disabled={!questions.prev} onClick={() => {
          navigate(`/exams/${id}/questions/${questions.prev._id}`);
        }}>
          <ArrowBackIosIcon />
        </Button>
        <Button disabled={!questions.next} onClick={() => {
          navigate(`/exams/${id}/questions/${questions.next._id}`);
        }}>
          <ArrowForwardIosIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Header;