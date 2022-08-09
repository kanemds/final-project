import React from 'react'
import HomeIcon from '@mui/icons-material/HomeRounded';
import QuizIcon from '@mui/icons-material/QuizRounded';
import StudentIcon from '@mui/icons-material/PersonRounded';
import CoursesIcon from '@mui/icons-material/AutoStories';
import ReportsIcon from '@mui/icons-material/EqualizerSharp';
import AccountIcon from '@mui/icons-material/ManageAccountsSharp';
import LogoutIcon from '@mui/icons-material/ExitToAppRounded';



export const StudentSidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/student/home"
  },
  {
    title: "Courses",
    icon: <CoursesIcon />,
    link: "/student/courses"
  },
  // {
  //   title: "Exams",
  //   icon: <QuizIcon />,
  //   link: "/student/exams"
  // },
  {
    title: "Account",
    icon: <AccountIcon />,
    link: "/student/account"
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/"
  },

]
