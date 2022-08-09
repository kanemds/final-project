import React, { useState, useEffect } from 'react';
import { api_base } from 'config'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function useExam() {
  const [exam, setExam] = useState([]);
  const params = useParams()

  useEffect(() => {
    getExam(params.id).then(() => { })
  }, [params.id])

  const getExam = async (examId) => {
    const exam = await axios.get(`${api_base}/exams/${examId}`)
    setExam(exam.data)
  }

  /* post /exam/:id/questions/:questionId
  // body { answer: answer_id }
  // ????
  // new model, scorecard
  // {
    studentId: ____,
    examId: ____
    answers: [{
      userChoice: 0, // index of answer or id of answer
      isCorrectAnswer: true or false
    }],
    score: 5, // calculated from [total number of isCorrectAnsswe] / total questions,
    attempt:
    date:
    limit:
  */

  const saveExam = async (exam) => {
    // do save exam
  }

  return { exam, setExam, getExam, saveExam }
}

export default useExam