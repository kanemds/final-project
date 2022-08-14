import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { LoginContext } from 'Contexts/LoginContext';
import useScore from 'components/hooks/useScore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const DoneExams = () => {
  const { id } = useParams()
  const { userId, exams } = useContext(LoginContext)
  const { getAllScoreByExamId, getScoreByExamId } = useScore()
  const navigate = useNavigate()
  const scores = getAllScoreByExamId(id)
  const score = getScoreByExamId(id)
  console.log(score)
  const examInfo = exams && score && exams.find(info => info._id === score.exam)
  const currentExam = score && Math.trunc(((score.score / score.totalScore) * 100))



  if (!exams || !score || !examInfo || !scores) {
    return "loading..."
  }
  const data = [
    { name: "Score", value: currentExam },
    { name: "remainScore", value: 100 - currentExam },

  ];
  const COLORS = ["#00C49F", "#ebe8e8"];

  console.log(score)
  console.log(examInfo)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: "center",
        mt: 10,
        '& > :not(style)': {
          width: 600,
          height: 700,
        },
      }}
    >
      <Paper variant="outlined" sx={{
        p: 4,
        display: "flex",
        flexDirection: "column"
      }}>

        <Typography variant="h2" component="h2">
          {examInfo.name}
        </Typography>

        <Typography variant="h4" component="h2">
          Result
        </Typography>

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
        <h1>Score:  </h1>
        <Box sx={{
          display: "flex",
          mt: 6,
          justifyContent: 'space-around'
        }}>
          <Box sx={{
            ml: 5
          }}>

            <Typography variant="h2" component="h2">
              {currentExam}%
            </Typography>
          </Box>
          <PieChart width={200} height={160}>
            <Pie
              data={data}
              isAnimationActive={true}
              animationBegin={10}
              animationDuration={3000}
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"

            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </Box>
        {!examInfo.attemptsLimit ? <h3>Attempt: {scores.length} / Practice</h3> :
          <h3>Attempt: {scores.length}/{examInfo.attemptsLimit}</h3>}

        <h3>Passing Score Require: {examInfo.passScore}%</h3>
        <Box>
          <Button variant="contained" onClick={() => {
            navigate('/student/home')
          }}>Back to Home</Button>
        </Box>

      </Paper>
    </Box >
  )
}

export default DoneExams