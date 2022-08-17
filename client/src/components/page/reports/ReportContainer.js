import React, { useState, useEffect } from 'react'
import { useParams, Outlet } from "react-router-dom";
import Box from '@mui/material/Box';

import ReportHeader from 'components/page/reports/ReportHeader';

const ReportContainer = () => {
  return (
    <Box sx={{m: 6}}>
      <ReportHeader />
      <Box sx={{ bgcolor: 'white', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default ReportContainer;