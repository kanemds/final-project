import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { pink } from '@mui/material/colors';
import { blue } from '@mui/material/colors';


import BasicModal from './ModalAddExam';
import { api_base } from 'config'

const Exam = ({ exam }) => {
  const navigate = useNavigate();
  return (

    <Card
      key={exam._id}
      sx={{
        minWidth: 50,
        margin: 1,
        "&:hover": {
          boxShadow: "0 2px 5px 1px",
          cursor: "pointer"
        }

      }}
    >
      <CardContent >
        <Typography sx={{ fontSize: 24 }} gutterBottom>
          <Link href={`/teacher/exams/${exam._id}/questions`}>{exam.name}</Link>
        </Typography>
        <Typography sx={{ fontSize: 20 }} gutterBottom>
          Questions: {exam.questions.length}
        </Typography>
        <Typography sx={{ fontSize: 20 }} gutterBottom>
          Passing Score: {exam.passScore}
        </Typography>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Last Edited: {new Date(exam.created).toLocaleDateString('en-US')}
        </Typography>
        <HighlightOffIcon fontSize="large" sx={{ color: pink[500], mr: 3 }}
        // onClick={() => { removeExam(exam._id) }} 
        />
        <BorderColorIcon fontSize="large" sx={{ color: blue[500] }}
          onClick={() => {
            navigate(`/teacher/exams/${exam._id}/questions`)
          }} />
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>

  )
}
export default Exam;