import React, { useContext } from 'react'
import '../../App.css'
import { StudentSidebarData } from './StudentSidebarData'
import {
  Link
} from "react-router-dom";
import {
  useLocation
} from "react-router-dom";
import { LoginContext } from 'Contexts/LoginContext';

export const StudentSidebar = (props) => {
  const location = useLocation();
  const { userId } = useContext(LoginContext)

  return (
    <div className='Sidebar'>
      <ul className='SidebarList'>
        {StudentSidebarData.map((icon, key) => {
          let newLink = icon.link
          return (
            <li key={key} className="row" data-active={location.pathname.indexOf(newLink) >= 0 ? "true" : "false"}>
              <Link to={newLink}>
                <div id="icon">{icon.icon}</div>
                <div id="title">{icon.title}</div>
              </Link>
            </li>
          )
        })
        }
      </ul>
    </div>
  )
}

export default StudentSidebar


