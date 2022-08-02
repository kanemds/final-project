import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import axios from 'axios';

import { api_base } from 'config'

import Answer from './Answer';
import AllAbove from './AllAbove';
import IncludeinCat from './IncludeinCat';


const QuestionEditForm = () => {
  const [selected, setSelected] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState([]);
  const [checkedAllAbove, setCheckedAllAbove] = useState(false);
  const [aboveSelected, setAboveSelected] = React.useState("All of the Above");
  const [checkedCat, setCheckedCat] = useState(false);
  const [catSelected, setCatSelected] = React.useState("");
  const [catsOptions, setCatsOptions] = useState([]);
  let navigate = useNavigate();
  const {id, categoryId, questionId} = useParams();
  let questionOrder;
  let correctAnswerPos;
	useEffect(() => {
    const getQuestion = async () => {
      const cats = await axios.get(`${api_base}/categories/${id}`);
      setCatsOptions(_prev => cats.data.categories);
      const questionData = await axios.get(`${api_base}/questions/${categoryId}/${questionId}`);
      const currentQuestion = questionData.data[0];
      questionOrder = currentQuestion.order;
      setQuestion(_prev => currentQuestion.content);
      const answersContent = currentQuestion.answers.map((ansObj, i) => {
        if (ansObj._id === currentQuestion.correctAnswer) {
          correctAnswerPos = i;
        }
        return ansObj.content;
      });
      setAnswers(_prev => answersContent);
      setSelected(_prev => correctAnswerPos);
      const lastAnswerContent = answersContent[answersContent.length - 1];
      if (lastAnswerContent === 'All of the Above' || lastAnswerContent === 'None of the Above') {
        setCheckedAllAbove(_prev => true);
        setAboveSelected(_prev => lastAnswerContent);
      }
      const categoryContent = currentQuestion.catName;
      if (categoryContent !== 'No Category Assigned') {
        setCheckedCat(_prev => true);
        setCatSelected(_prev => categoryContent);
      }
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
      //edit
      // const ansData = await axios.post(`${api_base}/answers/new`, {content});
      ansArr.push(ansData.data._id);
      if (i === selected) {
        corAns = ansData.data._id;
      }
    }
    // edit
    // const questionData = await axios.post(`${api_base}/questions/new`, {content: question, answers: ansArr, correctAnswer: corAns, questionOrder: Number(questionOrder)});
    // console.log(questionData, '#####')
    let categoryId = catsOptions[0]._id;
    if (checkedCat && catSelected) {
      categoryId = catSelected;
    }
    //edit
    // const catData = await axios.post(`${api_base}/categories/edit`, {categoryId, questionId: questionData.data._id, id});
    // console.log(catData, 'CATdATA###')
    navigate(`/exams/${id}/questions/${questionId}`);
  };
  return (
    <>
    <h3>Edit Your Question</h3>
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
          // if (index === answers.length - 1 && checkedAllAbove) {
          //   answer = aboveSelected;
          // }
          return (
            <div key={index + 1} style={{display: "flex", flexDirection: "row"}}>
              <h4>{letters[index]}</h4>
              <Answer setSelected={setSelected} handleChange={handleChange} selected={selected} answerId={index} answer={answer} answers={answers} setAnswers={setAnswers} checkedAllAbove={checkedAllAbove} setCheckedAllAbove={setCheckedAllAbove} />
            </div>
          )})}
        <Button onClick={() => {
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
        <IncludeinCat catsOptions={catsOptions} setCatsOptions={setCatsOptions} checkedCat={checkedCat} setCheckedCat={setCheckedCat} catSelected={catSelected} setCatSelected={setCatSelected} />
        <Button component={Link} to={`/exams/${id}/questions/${questionId}`}>Cancel</Button>
         <Button onClick={async () => await save()}>
          Save
        </Button>
      </div>
	  </>
  )
}

export default QuestionEditForm;