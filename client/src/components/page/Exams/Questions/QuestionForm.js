import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams, Link } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Box from '@mui/material/Box';
import { api_base } from 'config'

import Answer from './Answer';
import SaveButton from './SaveButton';
import AllAbove from './AllAbove';
import { padding } from '@mui/system';


const QuestionForm = () => {
  const [selected, setSelected] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState(['','','','']);
  const [checked, setChecked] = useState(false);
  const [aboveSelected, setAboveSelected] = React.useState("All of the Above");
  const {id} = useParams();
  const cancelLink = `/exams/${id}/questions`;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const handleChange = (answerId) => {
    setSelected(answerId);
  };
  const save = () => {
    const ansArr = [];
    answers.forEach(async (content, i) => {
      const ansData = await axios.post(`${api_base}/answers/new`, {content});
      ansArr.push(ansData.data.content._id);
    });
  };
  return (
    <>
       <Box
      sx={{
        width:"auto",
        height: "100vh",
        backgroundColor: 'white',
        padding: "1rem",
        borderRadius:.3
      }}
    >
      <div style={{display: "flex", flexDirection: "column"}}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Enter Your Question ({4000 - question.length} characters remaining)
				</Typography>
        <TextField
          id="qustion-id"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          fullWidth
        />
        {answers.map((answer, index) => {
          if (index === answers.length - 1 && checked) {
            answer = aboveSelected;
          }
          return (
            <div key={index + 1} style={{display: "flex", flexDirection: "row"}}>
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
         <Button ><SaveButton question={question} answers={answers} correctAnswerIndex={selected}/></Button>
      </div>
      </Box>
	  </>
  )
}

export default QuestionForm;