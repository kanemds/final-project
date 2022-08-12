import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { api_base } from 'config';

const ReportHeader = () => {
  let navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const links = [
    `/teacher/reports/records`,
    `/teacher/reports/statistics`
  ]
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue)
    navigate(links[newValue])
  };
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (
    <div className='selector'>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Records" {...a11yProps(0)} />
        <Tab label="Statistics" {...a11yProps(1)} />
      </Tabs>
    </div>
  )
}

export default ReportHeader;