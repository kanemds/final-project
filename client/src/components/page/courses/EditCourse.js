import { Info } from '@mui/icons-material'
import React from 'react'
import { useParams } from 'react-router-dom'
import useTeacherCourses from './useTeacherCourses'
import { Typography } from '@mui/material'
const EditCourse = () => {
  const { id } = useParams()
  const { data } = useTeacherCourses()
  const currentCourse = data.find(item => item._id === id)


  if (!currentCourse || !data)
    return ""


  return (
    <>
      <Typography variant="h3" component="h2">Course</Typography>
      <br />
      <Typography sx={{ m: 2 }} variant="h5" component="h2">Course Name: {currentCourse.name}</Typography>
      <Typography sx={{ m: 2 }} variant="h5" component="h2">Total exams: {currentCourse.exams.length}</Typography>
      <Typography sx={{ m: 2 }} variant="h5" component="h2">Total Students: {currentCourse.students.length}</Typography>
    </>
  )
}

export default EditCourse