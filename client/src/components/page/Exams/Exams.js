import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react'


import BasicModal from './ModalAddExam';
import { Link } from 'react-router-dom'
import { api_base } from 'config'
import useExams from './useExams'

const Exams = () => {


  const exams = useExams();

  return (
    <>
      <h1>Exam Manager</h1>
      <BasicModal />
      <Box sx={{ minWidth: 275 }}  >
      
    
      {exams.map(exam => {
        return <div key={exam._id}><Link to={`/exams/${exam._id}/questions`} style={{textDecoration: 'none'}} >
        <Card variant="outlined" >
        <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        
        </Typography>
        <Typography variant="h4" component="div"  >
        {exam.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Math
        </Typography>
     
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
           </Card>
        </Link></div>
      })}
      </Box>
    </>
  )
}

export default Exams