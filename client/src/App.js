import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "components/page/home/Home";
import Exams from "components/page/Exams/Exams";
import Students from "components/page/students/components/Students";
import Courses from "components/page/courses/TeacherCourses";
import NewAccount from "components/page/account/AddAccount";
import Account from "components/page/account/Account";
import Logout from "components/page/Logout";
import Billing from "components/page/account/billing/Billing";
import ExamQuestions from "components/page/Exams/Questions/ExamQuestions";
import ExamQuestionsNew from "components/page/Exams/Questions/ExamQuestionsNew";
import QuestionOperations from "components/page/Exams/Questions/QuestionOperations/QuestionOperations";
import QuestionEdit from "components/page/Exams/Questions/QuestionOperations/QuestionEdit";
import ExamCategories from "components/page/Exams/Categories/ExamCategories";
import CategoryEdit from "components/page/Exams/Categories/CategoryEdit";
import ExamProperties from "components/page/Exams/Properties/ExamProperties";
import ExamMatrix from "components/page/Exams/Matrix/ExamMatrix";
import ExamActivation from "components/page/Exams/Activation/ExamActivation";
import Root from "Root";
import ExamContainer from "ExamContainer";
import ReportContainer from "ReportContainer";
import { UserList } from "components/page/students/components/userlist";
import CheckoutSuccess from "components/page/account/billing/CheckoutSuccess";
import NotFound from "components/NotFound";

import AddStudent from "components/page/students/components/AddStudent";
import Teacher from "components/page/home/teacher/Teacher";
import StudentRoot from "components/studentPage/StudentRoot";
// import EditStudent from "components/page/students/components/EditStudent";
import StudentHomePage from "components/studentPage/home/StudentHomePage";
import ExamStudentPage from "components/studentPage/examsStudentPage/ExamStudentPage";
import { useContext } from "react";
import { LoginContext } from "Contexts/LoginContext";
import { useState } from "react";
import useTeacherCourses from "components/page/courses/useTeacherCourses";
import EditCourse from "components/page/courses/EditCourse";
import CoursesContainer from "./components/page/courses/CoursesContainer";
import AddExamsToCourse from "components/page/courses/AddExamsToCourse";
import AddStudentsToCourse from "components/page/courses/AddStudentsToCourse";
import StudentExams from "./components/studentPage/examsStudentPage/StudentExams"
import TakingExams from "components/studentPage/TakingExams.js/TakingExams";
import DoneExams from "components/studentPage/TakingExams.js/DoneExams";
import EditAccount from "components/page/account/editAccount";
import EditStudent from "components/page/students/components/Editstudent";
import Records from "components/page/reports/Records";
import Statistics from "components/page/reports/Statistics";
import Reports from "components/page/Reports";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />

        {/* teacher routes */}
        <Route element={<Root />}>
          <Route path="/teacher/exams" element={<Exams />} />
          <Route element={<ExamContainer />}>
            <Route path="/teacher/exams/:id/questions" element={<ExamQuestions />} />
            <Route path="/teacher/exams/:id/questions/new/:questionOrder" element={<ExamQuestionsNew />} />
            <Route path="/teacher/exams/:id/categories/:categoryId/questions/:questionId/edit/:questionOrder" element={<QuestionEdit />} />
            <Route path="/teacher/exams/:id/questions/:questionId/:questionOrder" element={<QuestionOperations />} />
            <Route path="/teacher/exams/:id/categories" element={<ExamCategories />} />
            <Route path="/teacher/exams/:id/categories/:categoryId/edit" element={<CategoryEdit />} />
            <Route path="/teacher/exams/:id/properties" element={<ExamProperties />} />
            <Route path="/teacher/exams/:id/matrix" element={<ExamMatrix />} />
            <Route path="/teacher/exams/:id/activation" element={<ExamActivation />} />
          </Route>
          <Route path="/teacher/students" element={<Students />} />
          <Route path="/teacher/userlist" element={<UserList />} />
          <Route path="/teacher/students/new" element={<AddStudent />} />
          <Route path="/teacher/students/edit" element={<EditStudent />} />

          {/* {reports page} */}
          <Route path="/teacher/reports" element={<Reports />} />
          <Route element={<ReportContainer />}>
            <Route path="/teacher/:teacherId/reports/records" element={<Records />} />
            <Route path="/teacher/:teacherId/reports/statistics" element={<Statistics />} />
          </Route>

          {/* courses page */}
          <Route path="/teacher/courses" element={<Courses />} />
          <Route element={<CoursesContainer />}>
            <Route path="/teacher/courses/:id/edit" element={<EditCourse />} />
            <Route
              path="/teacher/courses/:id/addexams"
              element={<AddExamsToCourse />}
            />
            <Route
              path="/teacher/courses/:id/addstudents"
              element={<AddStudentsToCourse />}
            />
          </Route>
          <Route path="/teacher/students" element={<Students />} />
          <Route path="/teacher/courses/:id/edit" element={<EditCourse />} />
          <Route path="/teacher/courses" element={<Courses />} />
          {/* <Route path="/teacher/reports" element={<Reports />} /> */}
          <Route path="/teacher/account" element={<Account />} />
          <Route path="/teacher/logout" element={<Logout />} />
          <Route path="/teacher/account/billing" element={<Billing />} />
          <Route
            path="/teacher/checkout-success"
            element={<CheckoutSuccess />}
          />
          <Route path="/teacher/home" element={<Teacher />} />
        </Route>
        <Route path="/teacher/account/new" element={<NewAccount />} />
        <Route path="/teacher/account/edit" element={<EditAccount />} />

        {/* <Route path="/reports" element={<Reports />} /> */}
        <Route path="/teacher/account" element={<Account />} />
        <Route path="/teacher/logout" element={<Logout />} />
        <Route path="/teacher/account/billing" element={<Billing />} />
        <Route path="/teacher/checkout-success" element={<CheckoutSuccess />} />
        <Route
          path="/student/exams"
          element={<ExamStudentPage />}
        />
        <Route>
          <Route path="/teacher/home" element={<Teacher />} />
        </Route>

        {/* student route */}

        <Route>
          <Route element={<StudentRoot />}>
            <Route path="/student/home" element={<StudentHomePage />} />

            <Route path="/student/courses" element={<StudentExams />} />
            <Route path="/student/courses/:id/exam" element={<TakingExams />} />

            <Route path="/student/courses/:id/exam/done" element={<DoneExams />} />


          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
