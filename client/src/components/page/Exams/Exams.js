import React, { useState, useEffect } from 'react'

import Exam from './Exam'
import BasicModal from './ModalAddExam';
import { api_base } from "config";

import axios from "axios";
const Exams = () => {
  const [examsState, setExamsState] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      const exams = await axios.get(`${api_base}/exams`);
      setExamsState(_prev => exams.data);
    }
    getExams();
  }, []);
  return (
    <>
      <h1>Exam Manager</h1>
      <BasicModal setExamsState={setExamsState}/>
      <div>
        {examsState.length > 0 && examsState.map((exam, i) => {
          return <Exam key={i + 1} exam={exam} />
        })}
      </div>
    </>
  );
};

export default Exams;
