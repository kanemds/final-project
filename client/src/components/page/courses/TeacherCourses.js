import React, { useContext } from 'react'
import useExams from 'components/page/Exams/useExams'
import { LoginContext } from 'Contexts/LoginContext'
import TeacherCoursesShow from './TeacherCoursesShow'

const TeacherCourses = () => {
  const { exams } = useExams()
  const { teacherId, teachers } = useContext(LoginContext)
  const teacher = teachers.find((item) => item._id === teacherId)

  if (!teacher || !exams) {
    return 'loading...'
  }

  return (
    <>
      <div key={teacher._id}>
        <TeacherCoursesShow />
      </div>
    </>
  )

}


export default TeacherCourses
