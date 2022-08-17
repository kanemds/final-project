import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import EmptyQuestion from '../img/EmptyQuestion.jpg';
import axios from 'axios';


import { api_base } from 'config';
import BasicModal from './ModalAddQuestion';
import QuestionsFilters from './QuestionsFilters';
import { Paper } from '@mui/material';

const ExamQuestions = () => {

  let { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const { questionsFilterState, activate } = useOutletContext();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const getQuestions = async () => {
      const questionsData = await axios.get(`${api_base}/exams/${id}/questions`);
      setQuestions(_prev => questionsData.data);
      setLoad(_prev => false);
    }
    getQuestions();
  }, []);
  return (
    <>
      <BasicModal questionOrder={questions.length + 1} activate={activate} />
      <Box>
        {load && <h1>Loading</h1>}
      </Box>
      <Box>
        {!load && questions.length === 0 && <img src={EmptyQuestion} />}
      </Box>
      <Box pt={2}>
        <Paper>
          <Box style={{ height: 400, width: '100%' }}>
              {!load && questions.length > 0 && <QuestionsFilters questions={questions} questionsFilterState={questionsFilterState} activate={activate} />}
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default ExamQuestions;