import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { LoginContext } from 'Contexts/LoginContext';
import useScore from 'components/hooks/useScore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const DoneExams = () => {
  const { id } = useParams()
  const { userId, exams } = useContext(LoginContext)
  const { getAllScoreByExamId, getScoreByExamId } = useScore()
  const navigate = useNavigate()
  const scores = getAllScoreByExamId(id)
  const score = getScoreByExamId(id)
  const examInfo = exams && score && exams.find(info => info._id === score.exam)
  const currentExam = score && Math.trunc(((score.score / score.answers.length) * 100))

  console.log({
    exams,
    score,
    examInfo,
    scores,
    currentExam
  })

  if (!exams || !score || !examInfo || !scores) {
    return "loading..."
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: "center",
        mt: 15,
        '& > :not(style)': {
          width: 600,
          height: 800,
        },
      }}
    >
      <Paper variant="outlined" sx={{
        p: 4
      }}>
        <h1>{examInfo.name}</h1>
        <h2>Result</h2>
        <Paper variant="outlined" sx={{
          display: "flex",
          justifyContent: 'center',
          p: 4
        }} >
          {/* <h2>Last Score: {lastExam}%</h2> */}
          {currentExam < examInfo.passScore ?

            <h3>{examInfo.passFeedback} </h3> :
            <h3> {examInfo.failFeedback}</h3>
          }
        </Paper>
        <h3>Attempt: {scores.length}/{examInfo.attemptsLimit}</h3>
        <h3>Score:{currentExam}%</h3>
        <h3>Passing Score Require: {examInfo.passScore}%</h3>
        <Button onClick={() => {
          navigate('/student/home')
        }}>Back to Home</Button>
      </Paper>
    </Box >
  )
}

export default DoneExams