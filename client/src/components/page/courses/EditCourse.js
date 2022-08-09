import { Info } from '@mui/icons-material'
import React from 'react'
import { useParams } from 'react-router-dom'
import useTeacherCourses from './useTeacherCourses'

const EditCourse = () => {
  const { id } = useParams()
  const { data } = useTeacherCourses()
  const currentCourse = data.find(item => item._id === id)


  if (!currentCourse || !data)
    return ""


  return (
    <>
      <h1>Course</h1>

      <p>Course Name:{currentCourse.name}</p>
      <p>Total exams: {currentCourse.exams.length}</p>
      <p>Total Students: {currentCourse.students.length}</p>
      <p></p>

    </>
  )
}

export default EditCourse