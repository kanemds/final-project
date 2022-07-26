import React from 'react'
import '../App.css'
import { SidebarData } from './SidebarData'

export const Sidebar = () => {
      return (


        <div className='Sidebar'>
          <ul className='SidebarList'>
          { SidebarData.map((icon, key) => {
            return (
              <li key={key} onClick={() => {window.location.pathname = icon.link }} className="row" id={window.location.pathname === icon.link ? "active" : ""}> 
                <div id="icon">{icon.icon}</div>
                <div id="title">{icon.title}</div>
              </li>
            )
          }) 
         }
    
          </ul>
        </div>
      )
    }
    
    export default Sidebar


