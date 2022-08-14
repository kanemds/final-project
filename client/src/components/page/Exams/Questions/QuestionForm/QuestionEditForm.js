import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import { red } from '@mui/material/colors';
import axios from 'axios';

import { api_base } from 'config'

import Answer from './Answer';
import AllAbove from './AllAbove';
import IncludeinCat from './IncludeinCat';
import Used from './Used';

const QuestionEditForm = () => {
  const [oldQuestion, setOldQuestion] = useState({});
  const [selected, setSelected] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [points, setPoints] = useState("");
  const [answers, setAnswers] = React.useState([]);
  const [checkedAllAbove, setCheckedAllAbove] = useState(false);
  const [aboveSelected, setAboveSelected] = React.useState("");
  const [checkedCat, setCheckedCat] = useState(false);
  const [catSelected, setCatSelected] = React.useState("");
  const [catsOptions, setCatsOptions] = useState([]);
  const [usedState, setUsedState] = useState(true);
  let navigate = useNavigate();
  const {id, categoryId, questionId, questionOrder} = useParams();
  let correctAnswerPos;
	useEffect(() => {
    const getQuestion = async () => {
      const cats = await axios.get(`${api_base}/exams/${id}/categories`);
      setCatsOptions(_prev => cats.data.categories);
      const questionData = await axios.get(`${api_base}/categories/${categoryId}/questions/${questionId}`);
      const currentQuestion = questionData.data[0];
      setOldQuestion(_prev => currentQuestion);
      setQuestion(_prev => currentQuestion.content);
      const answersContent = currentQuestion.answers.map((ansObj, i) => {
        if (ansObj._id === currentQuestion.correctAnswer) {
          correctAnswerPos = i;
        }
        return ansObj.content;
      });
      setPoints(_prev => currentQuestion.points);
      setAnswers(_prev => answersContent);
      setSelected(_prev => correctAnswerPos);
      const lastAnswerContent = answersContent[answersContent.length - 1];
      if (lastAnswerContent === 'All of the Above' || lastAnswerContent === 'None of the Above') {
        setCheckedAllAbove(_prev => true);
        setAboveSelected(_prev => lastAnswerContent);
      } else {
        setAboveSelected(_prev => 'All of the Above');
      }
      const categoryContent = currentQuestion.catName;
      if (categoryContent !== 'No Category Assigned') {
        setCheckedCat(_prev => true);
        setCatSelected(_prev => currentQuestion.catId);
      }
      setUsedState(_prev => currentQuestion.used);
    }
    getQuestion();
  }, []);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const handleChange = (answerId) => {
    setSelected(answerId);
  };
  const save = async () => {
    const ansArr = [];
    let corAns;
    for (let i = 0; i < answers.length; i++) {
      const content = answers[i];
      const ansData = await axios.post(`${api_base}/answers/new`, {content});
      ansArr.push(ansData.data._id);
      if (i === selected) {
        corAns = ansData.data._id;
      }
    }
    let catId = catsOptions[0]._id;
    if (checkedCat && catSelected) {
      catId = catSelected;
    }
    
    const questionData = await axios.post(`${api_base}/questions/${oldQuestion._id}/edit`, {content: question, points, answers: ansArr, correctAnswer: corAns, category: catId, used: usedState});
    if (oldQuestion.catId !== catId) {
      // remove from old category
      await axios.post(`${api_base}/categories/deleteQuestion`, {categoryId: oldQuestion.catId, questionId: oldQuestion._id});
      // add into new category
      await axios.post(`${api_base}/categories/question/push`, {categoryId: catId, questionId: questionData.data._id});
    }
    for (const answer of oldQuestion.answers) {
      await axios.post(`${api_base}/answers/delete`, {answerId: answer._id});
    }
    navigate(`/teacher/exams/${id}/questions/${questionData.data._id}/${questionOrder}`);
  };
  return (
    <>
    <Typography variant="h5">Edit Your Question</Typography>
    <Box style={{display: "flex", flexDirection: "column"}} pt={1.5}>
      <Box style={{display: 'flex', gap: "1.5vw"}} pb={1.5}>
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          <AcUnitRoundedIcon sx={{ color: red[500] }}/> Points
        </Typography>
        <TextField type="number" value={points} onWheel={e => { e.target.blur()}}
          onChange={(event) => setPoints(_prev => {
            const val = event.target.value;				
            const points = val === "" ? val : Number(val);
            if (points < 0) {
              return 0;
            }
            return points;
			  	})}/>
      </Box>
      <Paper>
        <Box p={3}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <AcUnitRoundedIcon sx={{ color: red[500] }}/> Enter Your Question ({4000 - question.length} characters remaining)
				</Typography>
        <TextField 
          style={{marginTop: '1.3vw'}}
          id="qustion-id"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          fullWidth
        />
        {answers.map((answer, index) => {
          if (index === answers.length - 1 && checkedAllAbove) {
            answer = aboveSelected;
          }
          return (
            <div key={index + 1} style={{display: "flex", flexDirection: "row"}}>
              <h4>{letters[index]}</h4>
              <Answer setSelected={setSelected} handleChange={handleChange} selected={selected} answerId={index} answer={answer} answers={answers} setAnswers={setAnswers} checkedAllAbove={checkedAllAbove} setCheckedAllAbove={setCheckedAllAbove} />
            </div>
          )})}
         </Box>
        </Paper>
        <Box style={{display: 'flex', flexDirection: 'column', gap: '1vw'}} pt={3}>
          <Box style={{display: 'flex', gap: '3vw'}}>
            <Button variant="outlined" onClick={() => {
              setAnswers(prev => {
                const newPrev = [...prev];
                if (checkedAllAbove) {
                  newPrev[newPrev.length - 1] = "";
                  newPrev.push(aboveSelected);
                } else {
                  newPrev.push("");
                }
                return newPrev;
              })
            }} disabled={answers.length >= 6}>Add Choice</Button>
            <AllAbove letter={letters[answers.length - 1]} checkedAllAbove={checkedAllAbove} setCheckedAllAbove={setCheckedAllAbove} aboveSelected={aboveSelected} setAboveSelected={setAboveSelected} setAnswers={setAnswers} />
          </Box>
          <IncludeinCat catsOptions={catsOptions} setCatsOptions={setCatsOptions} checkedCat={checkedCat} setCheckedCat={setCheckedCat} catSelected={catSelected} setCatSelected={setCatSelected} />
          <Used usedState={usedState} setUsedState={setUsedState} />
        </Box>
        <Box style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" component={Link} to={`/teacher/exams/${id}/questions/${oldQuestion._id}/${questionOrder}`}>Cancel</Button>
          <Button variant="contained" onClick={save}>Update</Button>
        </Box>
      </Box>
	  </>
  )
}

export default QuestionEditForm;