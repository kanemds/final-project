import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams, Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";

import { api_base } from 'config'
import Answer from './Answer';
import AllAbove from './AllAbove';

const QuestionForm = () => {
  const [selected, setSelected] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState(['','','','']);
  const [checked, setChecked] = useState(false);
	const [above, setAbove] = useState("All");
  const handleChange = (answerId) => {
    setSelected(answerId);
  };
  const [aboveSelected, setAboveSelected] = React.useState("All of the Above");
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
          if (index === answers.length - 1 && checked) {
            answer = aboveSelected;
          }
          return (
            <div key={index + 1} style={{display: "flex", flexDirection: "rows"}}>
              <h4>{letters[index]}</h4>
              <Answer setSelected={setSelected} handleChange={handleChange} selected={selected} answerId={index} answer={answer} setAnswers={setAnswers} />
          </div>
          )})}
        <Button onClick={() => {
          setAnswers(prev => {
            const newPrev = [...prev];
            if (checked) {
              newPrev[newPrev.length - 1] = "";
              newPrev.push(aboveSelected);
            } else {
              newPrev.push("");
            }
            return newPrev;
          })
        }} disabled={answers.length >= 6}>Add Choice</Button>
        <AllAbove letter={letters[answers.length - 1]} checked={checked} setChecked={setChecked} setAboveSelected={setAboveSelected}/>
        <Button component={Link} to={cancelLink}>Cancel</Button>
        <Button onClick={() => alert(`${selected} - ${question} - ${answers}`)}>Save</Button>
      </div>
	  </>
  )
}

export default QuestionForm;