import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import { api_base } from 'config'

const Account = () => {


  const navigate = useNavigate();

  const navigateBilling = () => {
 
    navigate('/account/Billing');
  };

  return (
    <div className='account'>Account fdafsafsad
      <button onClick={navigateBilling}>Billing</button>
    </div>
  )
}

export default Account