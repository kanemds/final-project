import CourseHeader from './CourseHeader'
import React from 'react'
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';

const CoursesContainer = () => {
  return (
    <>
      <CourseHeader />
      <Box sx={{ bgcolor: 'white', p: 3 }}>
        <Outlet />
      </Box>
    </>
  )
}

export default CoursesContainer;