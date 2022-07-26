import React from 'react'
import HomeIcon from '@mui/icons-material/HomeRounded';
import QuizIcon from '@mui/icons-material/QuizRounded';
import StudentIcon from '@mui/icons-material/PersonRounded';
import GrouopsIcon from '@mui/icons-material/PeopleAltRounded';
import ReportsIcon from '@mui/icons-material/EqualizerSharp';
import AccountIcon from '@mui/icons-material/ManageAccountsSharp';
import LogoutIcon from '@mui/icons-material/ExitToAppRounded';



export const SidebarData = [ 
  {
    title:"Home",
    icon: <HomeIcon />,
    link: "/home"
  },
  {
    title:"Exam",
    icon: <QuizIcon />,
    link: "/exam"
  },
  {
    title:"Students",
    icon: <StudentIcon />,
    link: "/students"
  },
  {
    title:"Groups",
    icon: <GrouopsIcon />,
    link: "/groups"
  },
  {
    title:"Reports",
    icon: <ReportsIcon />,
    link: "/reports"
  },
  {
    title:"Account",
    icon: <AccountIcon />,
    link: "/account"
  },
  {
    title:"Logout",
    icon: <LogoutIcon />,
    link: "/logout"
  },

]
