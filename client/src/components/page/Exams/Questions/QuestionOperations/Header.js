
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { api_base } from 'config'

const Header = () => {
    let navigate = useNavigate();
    const {id, questionOrder} = useParams();
  return (
    <div>
      <Button onClick={() => {
        // navigate(`/exams/${id}/questions`);
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
  )
}

export default Header;