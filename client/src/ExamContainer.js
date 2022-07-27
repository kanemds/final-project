import ExamHeader from 'components/page/Exams/ExamHeader';
import Sidebar from 'components/Sidebar';
import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";

const ExamContainer = () => {
  return (
    <>
      <ExamHeader />
      <Outlet />
    </>
  )
}

export default ExamContainer;