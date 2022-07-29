import React, { useState, useEffect } from 'react';
import { api_base } from 'config'

function usePlan(props) {
  const [plan, setPlan] = useState([]);

  useEffect(() => {

    const fetchPlan = async () => {
      await fetch( `${api_base}/account/billing`)
      .then(res => res.json())
      .then(data => {
        setPlan(data)
        })
    }
    fetchPlan();
  }, []);

  if (plan === null) {
    return 'Loading...';
  }
  return plan ? plan : ''
}



export default usePlan