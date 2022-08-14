import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { api_base } from 'config'
import Distribution from './Distribution';
import ExamTable from './ExamTable';

const Scores = () => {
  const { courseId, examId } = useParams();
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [table, setTable] = useState({});
  useEffect(() => {
    const getScores = async () => {
      const scoresData = await axios.get(`${api_base}/score/courses/${courseId}/exams/${examId}`);
      setScores(_prev => scoresData.data);
      let min = 0;
      let max = 0;
      let attempts = 0;
      scoresData.data.forEach(score => {
        attempts++;
        if (score.score < min) {
          min = score.score;
        } else if (score.score > max) {
          max = score.score;
        }
      });
      setTable(_prev => ({name: scores.exam, attempts: attempts, highest: max, lowest: min}));
    }
    getScores();
  }, []);
  return (
    <>
      <ExamTable table={table} />
      <Distribution scores={scores} />
    </>
  )
}
export default Scores;