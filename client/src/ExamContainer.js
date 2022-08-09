import ExamHeader from 'components/page/Exams/ExamHeader';
import Sidebar from 'components/Sidebar';
import React, { useState, useEffect } from 'react'
import { useParams, Outlet } from 'react-router-dom';
import axios from 'axios';

import { api_base } from 'config'

const ExamContainer = () => {
  const {id} = useParams();
  const [questionsFilterState, setQuestionsFilterState] = useState({});
  const [activate, setActivate] = useState(false);
  const [examName, setExamName] = useState('');
  useEffect(() => {
    const getExam = async () => {
      const examData = await axios.get(`${api_base}/exams/${id}`);
      setExamName(_prev => examData.data.name);
      setActivate(_prev => examData.data.activate);
    }
    getExam();
  }, []);
  return (
    <>
      <br/>
      <ExamHeader examName={examName} />
      <br/>
      <Outlet context={{
        questionsFilterState, setQuestionsFilterState,
        activate, setActivate,
        setExamName
        }} />
    </>
  )
}

export default ExamContainer;