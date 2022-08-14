import React, { useState, useEffect } from 'react'
import { useParams, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';

import ReportHeader from 'components/page/reports/ReportHeader';

const ReportContainer = () => {
  return (
    <>
      <ReportHeader />
      <Box sx={{ bgcolor: 'white', p: 3 }}>
        <Outlet />
      </Box>
    </>
  )
}

export default ReportContainer;