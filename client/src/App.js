import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Sidebar} from './components/Sidebar';
import './App.css'
import Home from 'components/page/Home';
import  Exam  from 'components/page/Exam/Exam';
import  Students  from 'components/page/Students';
import  Groups  from 'components/page/Groups';
import  Reports  from 'components/page/Reports';
import  Account  from 'components/page/account/Account';
import  Logout  from 'components/page/Logout';
import Billing from 'components/page/account/Billing';


function App() {
	


	return (
		<>
			<Router>
				<Sidebar />
				<Routes>
					<Route path="/home" element={ <Home />} />
					<Route path="/exam" element={ <Exam />} />
					<Route path="/students" element={ <Students />} />
					<Route path="/groups" element={ <Groups />} />
					<Route path="/reports" element={ <Reports />} />
					<Route path="/account" element={ <Account />} />
					<Route path='/account/billing' element={ <Billing /> } />
					<Route path="/logout" element={ <Logout />} />
			
				</Routes>
			</Router>
		</>
	);
}
export default App;