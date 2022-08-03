
import React, { useContext } from 'react'
import useStudentHomePage from './useStudentHomePage'
import useExams from 'components/page/Exams/useExams'
import useCourses from '../StudentCourses/useCourse'
import { LoginContext } from 'Contexts/LoginContext'


const StudentHomePage = () => {
  const exams = useExams()
  console.log(exams)
  const courses = useCourses()
  const { students, userId, setUserId } = useContext(LoginContext)

  const student = students.find((item) => item._id === userId)

  if (!student) {
    return ''
  }

  const studentExams = exams.filter((item) => {
    return student.exam.find((examId) => examId === item._id)
  })

  const studenteCourses = courses.filter((item) => {
    return item.students.find((id) => student._id === id)
  })



  return (
    <div key={student._id}>
      <h1> {student.firstname}, {student.lastname}</h1>
      <h1>{student.email}</h1>
      <h2>Current courses: {studenteCourses.length}</h2>
      <h2>course Average</h2>
      <h2>Current Exam: {studentExams.length}
      </h2>
      <h2>Last exam score</h2>

    </div>
  )
}
export default StudentHomePage







