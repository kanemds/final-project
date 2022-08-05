import React, { useContext } from "react";
import useExams from "components/page/Exams/useExams";
import { LoginContext } from "Contexts/LoginContext";
import TeacherCoursesShow from "./TeacherCoursesShow";
import useTeacherCourses from "./useTeacherCourses";

const TeacherCourses = () => {
  const exams = useExams();
  const { teacherId, teachers } = useContext(LoginContext);
  const teacher = teachers.find((item) => item._id === teacherId);

  if (!teacher || !exams) {
    return "";
  }

  return (
    <>
      <h1>Course Categories</h1>
      <br />
      <div key={teacher._id}>
        <TeacherCoursesShow />
      </div>
    </>
  );
};

export default TeacherCourses;
