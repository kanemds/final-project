import React, { useContext } from 'react'
import StudentExams from './StudentExams'
import useStudentHomePage from '../home/useStudentHomePage'
import useExams from 'components/page/Exams/useExams'
import Courses from '../StudentCourses/StudentCourses'
import useCourses from '../StudentCourses/useCourse'
import { LoginContext } from 'Contexts/LoginContext'


const ExamStudentPage = () => {
  const students = useStudentHomePage()
  const { exams } = useExams()
  const { userId } = useContext(LoginContext)

  const student = students.find((item) => item._id === userId)
  if (!student || !exams) {
    return ''
  }
  const studentExams = exams.filter((item) => {
    return student.exam.find((examId) => examId === item._id)
  })

  return (
    <>

      <div key={student._id}>
        <StudentExams exams={studentExams} />
      </div>
    </>
  )

}


export default ExamStudentPage