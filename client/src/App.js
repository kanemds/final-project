import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./App.css";
import Home from "components/page/Home";
import Exams from "components/page/Exams/Exams";
import Students from "components/page/students/components/Students";
import Groups from "components/page/Groups";
import Reports from "components/page/Reports";
import Account from "components/page/account/Account";
import Logout from "components/page/Logout";
import Billing from "components/page/account/billing/Billing";
import ExamQuestions from "components/page/Exams/Questions/ExamQuestions";
import ExamQuestionsNew from "components/page/Exams/Questions/ExamQuestionsNew";
import ExamPools from "components/page/Exams/Pools/ExamPools";
import ExamProperties from "components/page/Exams/Porperties/ExamProperties";
import ExamScheduler from "components/page/Exams/Scheduler/ExamScheduler";
import Root from "Root";
import ExamContainer from "ExamContainer";
import { UserList } from "components/page/students/components/userlist";
import CheckoutSuccess from "components/page/account/billing/CheckoutSuccess";
import NotFound from "components/NotFound";
import AddStudent from "components/page/students/components/AddStudent";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Root />}>
            <Route path="/home" element={<Home />} />
            <Route path="/exams" element={<Exams />} />
            <Route element={<ExamContainer />}>
              <Route
                path="/exams/:id/questions/new"
                element={<ExamQuestionsNew />}
              />
              <Route path="/exams/:id/questions" element={<ExamQuestions />} />
              <Route path="/exams/:id/pools" element={<ExamPools />} />
              <Route
                path="/exams/:id/properties"
                element={<ExamProperties />}
              />
              <Route path="/exams/:id/scheduler" element={<ExamScheduler />} />
            </Route>
            <Route path="/students" element={<Students />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="students/new" element={<AddStudent />} />

            <Route path="/groups" element={<Groups />} />
            {/* <Route path="/reports" element={<Reports />} /> */}
            <Route path="/account" element={<Account />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/account/billing" element={<Billing />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
