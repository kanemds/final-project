import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./App.css";
import Home from "components/page/Home";
import Exam from "components/page/Exam/Exam";
import Students from "components/page/students/components/Students";
import Groups from "components/page/Groups";
import Reports from "components/page/Reports";
import Account from "components/page/Account";
import Logout from "components/page/Logout";

function App() {
  // const [students, setStudents] = useState([]);

  // useEffect(() => {
  // 	GetStudents();
  // }, []);

  // const GetStudents = () => {
  // 	fetch(api_base + '/Students')
  // 		.then(res => res.json())
  // 		.then(data => setStudents(data))
  // 		.catch((err) => console.error("Error: ", err));
  // }

  // const deleteStudent = async id => {
  // 	const data = await fetch(api_base + '/student/delete/' + id, { method: "DELETE" }).then(res => res.json());

  // 	setStudents(students => students.filter(student => student._id !== data.result._id));
  // }

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/students" element={<Students />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/account" element={<Account />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
