import { createContext, useState, useEffect } from "react";
import useStudentHomePage from "components/studentPage/home/useStudentHomePage";

export const LoginContext = createContext({})

export const LoginProvider = ({ children }) => {
  const students = useStudentHomePage()
  const user = sessionStorage.getItem('user')
  const [userId, setUserId] = useState(user)
  return (
    <LoginContext.Provider value={{ students, userId, setUserId }}>
      {children}
    </LoginContext.Provider>
  )
}
