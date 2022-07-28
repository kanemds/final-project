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
  const handleChange = (answerId) => {
    setSelected(answerId);
  };
  const {id} = useParams();
  const cancelLink = `/exams/${id}/questions`;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
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
          return (
            <div key={index + 1} style={{display: "flex", flexDirection: "rows"}}>
              <h4>{letters[index]}</h4>
              <Answer setSelected={setSelected} handleChange={handleChange} selected={selected} answerId={index} answer={answer} setAnswers={setAnswers} />
          </div>
          )})}
        <Button onClick={() => setAnswers(prev => {
          const newPrev = [];
          prev.forEach((ans, i) => {
            if (i === prev.length - 1) {
              if (ans === "All of the Above") {
                newPrev.push("");
                newPrev.push("All of the Above");
              } else {
                newPrev.push(ans);
                newPrev.push("");
              }
            } else {
              newPrev.push(ans);
            }
          });
          return newPrev;
        })} disabled={answers.length >= 6}>Add Choice</Button>
        <Button onClick={() => setAnswers(prev => {
          const newPrev = [...prev];
          newPrev.push("All of the Above");
          return newPrev;
        })} disabled={answers.length >= 6}>Add {letters[answers.length]}: All of the Above</Button>
        <Button component={Link} to={cancelLink}>Cancel</Button>
        <Button onClick={() => alert(`${selected} - ${question} - ${answers}`)}>Save</Button>
      </div>
	  </>
  )
}

export default QuestionForm;