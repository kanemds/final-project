import { useEffect, useState } from 'react';
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
		<div className="App">
			
    <h1>Student List</h1>
          	{ students.map(student => (
            <div key={student._id}>
              
						  <p>Student first name:  {student.firstname}</p>
              <p>Student last name:  {student.lastname}</p>
              <p>Student email:  {student.email}</p>
            <div className="delete-student" onClick={() => deleteStudent(student._id)}>x</div>

            </div>    
						
        ))}
    </div>
    </>
	);
}
export default App;