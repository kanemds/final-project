
import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import StudentSidebar from './StudentSidebar';

const StudentRoot = ({ value }) => {



  return (
    <>
      <StudentSidebar />
      <div className="exam" style={{ height: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default StudentRoot;