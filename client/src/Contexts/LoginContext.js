import { createContext, useState, useEffect } from "react";
import useStudentHomePage from "components/studentPage/home/useStudentHomePage";
import useTeacher from "components/page/home/teacher/useTeacher";

export const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const students = useStudentHomePage();
  const teachers = useTeacher();
  const user = sessionStorage.getItem("user");
  const [userId, setUserId] = useState(user);
  return (
    <LoginContext.Provider value={{ students, userId, setUserId, teachers }}>
      {children}
    </LoginContext.Provider>
  );
};
