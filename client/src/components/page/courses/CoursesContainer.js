import CourseHeader from './CourseHeader'
import React from 'react'
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';

const CoursesContainer = () => {
  return (
    <>
      <Box
        sx={{ m: 3 }}
      >
        <CourseHeader />
        <Box sx={{ bgcolor: 'white', p: 3 }}>
          <Outlet sx={{ mt: 16 }} />
        </Box>
      </Box>
    </>
  )
}

export default CoursesContainer;