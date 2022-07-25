import { useEffect, useState } from 'react';
import {Sidebar} from './Components/Sidebar';
import './App.css'
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

		<div className="App">
			<Sidebar />
    </div>

	);
}
export default App;