import React, { useState } from 'react'
import {Checkbox, Button, TableContainer,Table,TableBody,TableCell,TableHead,Paper, TableRow }  from '@mui/material';

const Billing = () => {

  const [schedule, setSchedule] = useState('monthly')
  const [plan, setPlan] = useState(null)
  const price = {
    basic: {
      monthly: 59,
      yearly: 659
    },
    pro: {
      monthly: 120,
      yearly: 1299
    }
  }
  
  const handleSchedule = () => {
    setSchedule(schedule === 'yearly' ? 'monthly' : 'yearly')
  }
  
  const handleChecked = (e) => {
    const thisPlan = e.target.getAttribute('data-plan')
    setPlan(thisPlan)
  };  

  

  return (
    <div class="billing">
    

      <h1>Billing</h1>

      <div>
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
          <Button variant="contained" onClick={handleSchedule}>Switch to Year</Button>
          
      </div>

      <div>
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
            <TableRow>
              <TableCell>
                Basic
              </TableCell>
              <TableCell>
              ${ price.basic[schedule]}/month
              </TableCell>
              <TableCell>
              Plan includes: up to 100 active students
              </TableCell>
              <TableCell>
              <Checkbox checked={plan === 'basic'} inputProps={{ 'data-plan': 'basic', 'data-price': price.basic[schedule] }} onChange={handleChecked} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Pro
              </TableCell>
              <TableCell>
              ${ price.pro[schedule]}/month
              </TableCell>
              <TableCell>
              Plan includes: up to 300 active students
              </TableCell>
              <TableCell>
              <Checkbox checked={plan === 'pro'} inputProps={{ 'data-plan': 'pro', 'data-price': price.basic[schedule] }} onChange={handleChecked} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      </div>
     
      
      <div>
        <Button variant="contained">Cancle</Button>
        <Button variant="contained" color="success" >Continue</Button>
      </div>
    </div>
  )
}

export default Billing