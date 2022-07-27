import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams, Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";

import { api_base } from 'config'
import Answer from './Answer';

const QuestionForm = () => {
  const [selected, setSelected] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState(['','','','']);
  const [deleted, setDeleted] = React.useState({});
  const handleChange = (id) => {
    setSelected(id);
  };
  const setAnswer = (answerId, answer) => {
    const newAnswers = [...answers];
    newAnswers[answerId] = answer;
    setAnswers(newAnswers);
  }
  const {id} = useParams();
  const cancelLink = `/exams/${id}/questions`;
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
        {answers.map((answer, index) => {
          if (!deleted[index]) {
            return <Answer setSelected={setSelected} setDeleted={setDeleted} key={index + 1} handleChange={handleChange} selected={selected} answerId={index} answer={answer} setAnswer={setAnswer} />
          }
        }
        )}
        <Button component={Link} to={cancelLink}>Cancel</Button>
        <Button onClick={() => alert(`${selected} - ${question} - ${answers}`)}>Save</Button>
      </div>
	  </>
  )
}

export default QuestionForm;