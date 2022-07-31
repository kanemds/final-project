import ExamHeader from 'components/page/Exams/ExamHeader';
import Sidebar from 'components/Sidebar';
import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';

const ExamContainer = () => {
  return (
    <>
      <ExamHeader />
      <Box sx={{ bgcolor: 'white', p: 3 }}>
        <Outlet />
      </Box>
    </>
  )
}

export default ExamContainer;