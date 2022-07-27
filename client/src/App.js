import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Sidebar} from './components/Sidebar';
import './App.css'
import Home from 'components/page/Home';
import  Exams  from 'components/page/Exams/Exams';
import  Students  from 'components/page/Students';
import  Groups  from 'components/page/Groups';
import  Reports  from 'components/page/Reports';
import  Account  from 'components/page/Account';
import  Logout  from 'components/page/Logout';
import ExamQuestions from 'components/page/Exams/Questions/ExamQuestions';
import ExamQuestionsNew from 'components/page/Exams/Questions/ExamQuestionsNew';
import ExamPools from 'components/page/Exams/Pools/ExamPools';
import ExamProperties from 'components/page/Exams/Porperties/ExamProperties';
import ExamScheduler from 'components/page/Exams/Scheduler/ExamScheduler';
import Root from 'Root';
import ExamContainer from 'ExamContainer';

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
				<Routes>
					<Route element={ <Root />} >
						<Route path="/home" element={ <Home />} />
						<Route path="/exams" element={ <Exams />} />
						<Route element={ <ExamContainer />} >
							<Route path="/exams/:id/questions" element={ <ExamQuestions />} />
							<Route path="/exams/:id/questions/new" element={ <ExamQuestionsNew />} />
							<Route path="/exams/:id/pools" element={ <ExamPools />} />
							<Route path="/exams/:id/properties" element={ <ExamProperties />} />
							<Route path="/exams/:id/scheduler" element={ <ExamScheduler />} />
						</Route>
						<Route path="/students" element={ <Students />} />
						<Route path="/groups" element={ <Groups />} />
						<Route path="/reports" element={ <Reports />} />
						<Route path="/account" element={ <Account />} />
						<Route path="/logout" element={ <Logout />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}
export default App;