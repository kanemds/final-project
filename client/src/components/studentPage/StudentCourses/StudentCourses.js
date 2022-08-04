import React, { useContext } from 'react'
import StudentExams from '../examsStudentPage/StudentExams'
import useStudentHomePage from '../home/useStudentHomePage'
import useExams from 'components/page/Exams/useExams'
import Courses from '../StudentCourses/StudentCourses'
import useCourses from '../StudentCourses/useCourse'
import ShowCourses from './ShowCourses'
import { LoginContext } from 'Contexts/LoginContext'


const ExamStudentPage = () => {
  const students = useStudentHomePage()
  const { exams } = useExams()
  const { courses } = useCourses()
  const { userId } = useContext(LoginContext)
  console.log(userId)
  const student = students.find((item) => item._id === userId)

  if (!student || !exams) {
    return ''
  }


  return (
    <>
      <div key={student._id}>
        <ShowCourses courses={courses} />
      </div>
    </>
  )

}


export default ExamStudentPage