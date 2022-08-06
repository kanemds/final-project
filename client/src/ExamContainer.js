import ExamHeader from 'components/page/Exams/ExamHeader';
import Sidebar from 'components/Sidebar';
import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";

const ExamContainer = () => {
  const [questionsFilterState, setQuestionsFilterState] = useState({});
  return (
    <>
      <ExamHeader />
      <Outlet context={[questionsFilterState, setQuestionsFilterState]} />
    </>
  )
}

export default ExamContainer;