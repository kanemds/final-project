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
import ExamCategories from "components/page/Exams/Categories/ExamCategories";
import CategoryEdit from "components/page/Exams/Categories/CategoryEdit";
import ExamProperties from "components/page/Exams/Porperties/ExamProperties";
import ExamMatrix from "components/page/Exams/Matrix/ExamMatrix";
import Root from "Root";
import ExamContainer from "ExamContainer";
import CheckoutSuccess from "components/page/account/billing/CheckoutSuccess";
import NotFound from "components/NotFound";
import QuestionOperations from "components/page/Exams/Questions/QuestionOperations/QuestionOperations";
import QuestionEdit from "components/page/Exams/Questions/QuestionOperations/QuestionEdit";
import ExamActivation from "components/page/Exams/Activation/ExamActivation";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Root />}>
            <Route path="/home" element={<Home />} />
            <Route path="/exams" element={<Exams />} />
            <Route element={<ExamContainer />}>           
              <Route path="/exams/:id/questions/new/:questionOrder" element={<ExamQuestionsNew />} />
              <Route path="/exams/:id/questions" element={<ExamQuestions />} />
              <Route path="/exams/:id/questions/:questionId/:questionOrder" element={<QuestionOperations />} />
              <Route path="/exams/:id/categories/:categoryId/questions/:questionId/edit/:questionOrder" element={<QuestionEdit />} />
              <Route path="/exams/:id/categories" element={<ExamCategories />} />
              <Route path="/exams/:id/categories/:categoryId/edit" element={<CategoryEdit />} />
              <Route path="/exams/:id/properties" element={<ExamProperties />} />
              <Route path="/exams/:id/matrix" element={<ExamMatrix />} />
              <Route path="/exams/:id/activation" element={<ExamActivation />} />
            </Route>
            <Route path="/students" element={<Students />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/account" element={<Account />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/account/billing" element={<Billing />} />
            <Route path="/checkout-success" element={<CheckoutSuccess/>} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
