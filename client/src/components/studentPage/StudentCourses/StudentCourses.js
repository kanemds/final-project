import React, { useContext } from 'react'
import useStudentHomePage from '../home/useStudentHomePage'
import useExams from 'components/page/Exams/useExams'
import useCourses from '../StudentCourses/useCourse'
import ShowCourses from './ShowCourses'
import { LoginContext } from 'Contexts/LoginContext'


const ExamStudentPage = () => {
  const students = useStudentHomePage()
  const { exams } = useExams()
  const data = useCourses()
  const { userId } = useContext(LoginContext)
  const student = students.find((item) => item._id === userId)

  if (!student || !exams) {
    return ''
  }


  return (
    <>
      <div key={student._id}>
        <ShowCourses courses={data} />
      </div>
    </>
  )

}


export default ExamStudentPage