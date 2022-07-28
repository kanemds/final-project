import React, { useState } from 'react'
import {Checkbox, Button, TableContainer,Table,TableBody,TableCell,TableHead,Paper, TableRow }  from '@mui/material';
import usePlan from './usePlan';
import PayButton from "./PayButton"

const Billing = () => {
  const plans = usePlan()
 
  const [term, setTerm] = useState('month')
  const [planId, setPlanId] = useState(null)

  const handleTerm = () => {
    setTerm(term === 'year' ? 'month' : 'year')
    const newPlan = plans.find((plan) => plan.term !== term && plans.find((plan) => plan._id === planId).plan === plan.plan)
    setPlanId(newPlan._id)  
  }
  
  const handleChecked = (e) => {
    const thisPlanId = e.target.getAttribute('data-plan')
    setPlanId(thisPlanId)
  };  

  return (
 
    <div class="billing">
    

      <h1>Billing</h1>
      <stripe-pricing-table pricing-table-id="prctbl_1LQOOtK4K0yDBdauGtqi6wkM"
publishable-key="pk_test_51LITvJK4K0yDBdauv8dvoC0xIjEmHOkjy02FR1b0KrufM9ASuFXJfxadndGFAznysplirUq3RuNaejSEKLVIhzoq00z6UBNyvy">
</stripe-pricing-table>
      {/* <div>
        <div>Current monthyly bill</div>
        <p> 0</p>
      </div>
      <div>
        <div>Last Payment</div>
        <p>-----</p>
      </div>
      <div>
        <div>Next Payment Due</div>
        <p>-----</p>
      </div>

      <div>
          <h4>Select a Plan</h4>
          <Button variant="contained" onClick={handleTerm}>Switch to Year</Button>
          
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Plan</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Plan Description</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {plans.filter((plan) => plan.term === term).map((plan) => {
            return (
                <TableRow>
                  <TableCell>
                    { plan.plan }
                  </TableCell>
                  <TableCell>
                  ${ plan.price }/month
                  </TableCell>
                  <TableCell>
                  Plan includes: up to { plan.plan === 'pro' ? '300': '100'} active students
                  </TableCell>
                  <TableCell>
                  <Checkbox checked={planId === plan._id } inputProps={{ 'data-plan': plan._id, 'data-price': plan.price }} onChange={handleChecked} />
                  </TableCell>
                </TableRow>
          )
          })}
         </TableBody>
        </Table>
      </TableContainer>
      
      <Button variant="contained" >Cancle</Button>
      <Button variant="contained" color="success"  ><PayButton plan={plans.find((plan) => plan._id === planId)}/></Button> */}

    </div>
  
  )
}


export default Billing