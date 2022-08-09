import Sidebar from 'components/Sidebar';
import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Sidebar />
      <div className="exam" style={{height: "100%"}}>
        <div style={{display: "flex", flexDirection: "column", justifyContent: 'center', paddingRight: '2%'}}>
            <Outlet />
        </div>
      </div>
    </>
  )
}

export default Root;