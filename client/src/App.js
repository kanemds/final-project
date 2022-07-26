import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Sidebar} from './Components/Sidebar';
import './App.css'
import Home from './Components/page/Home';
import  Quiz  from './Components/page/Quiz';
import  Students  from './Components/page/Students';
import  Groups  from './Components/page/Groups';
import  Reports  from './Components/page/Reports';
import  Account  from './Components/page/Account';
import  Logout  from './Components/page/Logout';

const api_base = 'http://localhost:3001';


function App() {
	const [students, setStudents] = useState([]);

	

	useEffect(() => {
		GetStudents();
	}, []);

	const GetStudents = () => {
		fetch(api_base + '/Students')
			.then(res => res.json())
			.then(data => setStudents(data))
			.catch((err) => console.error("Error: ", err));
	}

  const deleteStudent = async id => {
		const data = await fetch(api_base + '/student/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setStudents(students => students.filter(student => student._id !== data.result._id));
	}


	return (
		<>
			<Router>
				<Sidebar />
				<Routes>
					<Route path="/home" element={ <Home />} />
					<Route path="/quiz" element={ <Quiz />} />
					<Route path="/students" element={ <Students />} />
					<Route path="/groups" element={ <Groups />} />
					<Route path="/reports" element={ <Reports />} />
					<Route path="/account" element={ <Account />} />
					<Route path="/logout" element={ <Logout />} />
			
				</Routes>
			</Router>
		</>
	);
}
export default App;