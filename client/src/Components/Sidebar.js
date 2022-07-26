import React from 'react'
import '../App.css'
import { SidebarData } from './SidebarData'
import {
  Link
} from "react-router-dom";
import {
  useLocation
} from "react-router-dom";

export const Sidebar = (props) => {
  const location = useLocation();
  
  return (
    <div className='Sidebar'>
      <ul className='SidebarList'>
        { SidebarData.map((icon, key) => {
          return (
            <li key={key} className="row" data-active={location.pathname.indexOf(icon.link) >= 0 ? "true" : "false"}> 
              <Link to={icon.link}>
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
    
export default Sidebar


