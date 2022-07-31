import React from "react";
import HomeIcon from "@mui/icons-material/HomeRounded";
import QuizIcon from "@mui/icons-material/QuizRounded";
import StudentIcon from "@mui/icons-material/PersonRounded";
import GrouopsIcon from "@mui/icons-material/PeopleAltRounded";
import ReportsIcon from "@mui/icons-material/EqualizerSharp";
import AccountIcon from "@mui/icons-material/ManageAccountsSharp";
import LogoutIcon from "@mui/icons-material/ExitToAppRounded";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/teacher/home",
  },
  {
    title: "Exams",
    icon: <QuizIcon />,
    link: "/teacher/exams",
  },
  {
    title: "Students",
    icon: <StudentIcon />,
    link: "/teacher/students",
  },
  {
    title: "Groups",
    icon: <GrouopsIcon />,
    link: "/teacher/groups",
  },
  // {
  //   title:"Reports",
  //   icon: <ReportsIcon />,
  //   link: "/reports"
  // },
  {
    title: "Account",
    icon: <AccountIcon />,
    link: "/teacher/account",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/",
  },
];
