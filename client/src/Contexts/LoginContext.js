import { createContext, useState, useEffect } from "react";
import useStudentHomePage from "components/studentPage/home/useStudentHomePage";
import useTeacher from "components/page/home/teacher/useTeacher";
import useTeacherCourses from "components/page/courses/useTeacherCourses";
import useExams from "components/page/Exams/useExams";
import useCourses from "components/studentPage/StudentCourses/useCourse";
import useAnswers from "components/hooks/useAnswer";
import useQuestions from "components/hooks/useQuestions";
import useScore from "components/hooks/useScore";

export const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const students = useStudentHomePage();
  const teachers = useTeacher();
  const { exams, removeExam } = useExams();
  const { data, removeCourse, addCourse, editCourse } = useTeacherCourses();
  const { getScoreByExamId, editScore, newScore } = useScore();
  const user = sessionStorage.getItem("user");
  const teacher = sessionStorage.getItem("teacherId");
  const [teacherId, setTeacherId] = useState(teacher);
  const [userId, setUserId] = useState(user);
  const [lastIncomplete, saveLastIncomplete] = useState();
  const [currentStudent, setCurrentStudent] = useState();
  const [currentTeacher, setCurrentTeacher] = useState();

  useEffect(() => {
    if (students && userId) {
      const student = students.find((each) => each._id === userId);
      setCurrentStudent(student);
    }
    if (teachers && teacherId) {
      const teacher = teachers.find((each) => each._id === teacherId);
      setCurrentTeacher(teacher);
    }
  }, [
    students,
    userId,
    setCurrentStudent,
    teachers,
    teacherId,
    setCurrentTeacher,
  ]);

  return (
    <LoginContext.Provider
      value={{
        students,
        userId,
        setUserId,
        teachers,
        teacherId,
        setTeacherId,
        exams,
        removeExam,
        data,
        removeCourse,
        addCourse,
        editCourse,
        lastIncomplete,
        saveLastIncomplete,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
