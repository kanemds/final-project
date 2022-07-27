import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import TextField from "@mui/material/TextField";

import { api_base } from 'config'
import Answers from './Answers';

const QuestionForm = () => {
  const [selected, setSelected] = React.useState(0);
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState(['','','',''])
  const handleChange = (id) => {
    setSelected(id);
  };

  const setAnswer = (radioId, answer) => {
    const newAnswers = [...answers];
    newAnswers[radioId] = answer;
    setAnswers(newAnswers);
  }

  return (
    <>
        <div style={{display: "flex", flexDirection: "column"}}>
          <TextField
            id="qustion-id"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            fullWidth
            label="Type your question here."
          />
          {answers.map((answer, index) =>
            <Answers handleChange={handleChange} selected={selected} radioId={index} answer={answer} setAnswer={setAnswer} />
          )}
          <Button>Cancel</Button>
          <Button onClick={() => alert(`${selected} - ${question} - ${answers}`)}>Save</Button>
        </div>
	  </>
  )
}

export default QuestionForm;