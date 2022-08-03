import React, { useContext } from 'react'
import useExams from 'components/page/Exams/useExams'
import { LoginContext } from 'Contexts/LoginContext'
import TeacherCoursesShow from './TeacherCoursesShow'
import useTeacherCourses from './useTeacherCourses'

const TeacherCourses = () => {

  const exams = useExams()
  const courses = useTeacherCourses()
  const { userId, teachers } = useContext(LoginContext)
  console.log(userId)
  const teacher = teachers.find((item) => item._id === userId)

  if (!teacher || !exams) {
    return ''
  }


  return (
    <>
      <div key={teacher._id}>
        {/* <TeacherCoursesShow courses={courses} /> */}
        <TeacherCoursesShow courses={courses} />
      </div>
    </>
  )

}


export default TeacherCourses