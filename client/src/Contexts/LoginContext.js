import { createContext, useState, useEffect } from "react";
import useStudentHomePage from "components/studentPage/home/useStudentHomePage";
import useTeacher from "components/page/home/teacher/useTeacher";



import useTeacherCourses from "components/page/courses/useTeacherCourses";
import useExams from 'components/page/Exams/useExams';
import useCourses from "components/studentPage/StudentCourses/useCourse";
import useAnswers from "components/hooks/useAnswer";
import useQuestions from "components/hooks/useQuestions";

export const LoginContext = createContext({})

export const LoginProvider = ({ children }) => {
  const students = useStudentHomePage()
  const teachers = useTeacher()

  const { exams, removeExam } = useExams()
  const { data, removeCourse, addCourse, editCourse } = useTeacherCourses()

  const user = sessionStorage.getItem('user')
  const teacher = sessionStorage.getItem('teacherId')
  const [teacherId, setTeacherId] = useState(teacher)
  const [userId, setUserId] = useState(user)


  return (
    <LoginContext.Provider value={{
      students, userId, setUserId, teachers, teacherId, setTeacherId,
      exams, removeExam,
      data, removeCourse, addCourse, editCourse
    }}>

      {children}
    </LoginContext.Provider>
  )
}
