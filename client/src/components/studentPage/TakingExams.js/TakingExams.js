import { LoginContext } from 'Contexts/LoginContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Box, Button, Table, TableCell, TableRow } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import useExam from 'components/page/Exams/useExam';
import { Check } from '@mui/icons-material';
import AlarmIcon from '@mui/icons-material/Alarm';
import { List } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import useScore from 'components/hooks/useScore';


const TakingExams = () => {
  const navigate = useNavigate()
  const { userId, lastIncomplete, countDown } = useContext(LoginContext)
  const { getScoreByExamId, editScore, newScore } = useScore()

  const { id } = useParams()
  const { exam } = useExam()
  console.log(exam)
  const questions = exam.questions
  const [selected, setSelected] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const tags = ["A", "B", "C", "D", "E", "F", "G", "H"]
  const currentScore = lastIncomplete || getScoreByExamId(id)
  console.log(currentScore)
  const selectedHandle = (answerId, currentQuestion) => {
    const newAnswers = answers
    newAnswers[currentQuestion] = answerId
    setSelected(answerId)
    setAnswers(newAnswers)
  }



  useEffect(() => {
    if (answers.length === 0 && currentScore && currentScore.answers && currentScore.answers.length > 0) {
      setAnswers(currentScore.answers)
    }
  }, [answers, currentScore])

  const remain = (time) => {
    const endTime = new Date().getTime() - new Date(currentScore.created).getTime();
    if (endTime < time) {
      editScore(currentScore._id, {
        submitted: true
      }).then(
        navigate(`/student/courses/${id}/exam/done`))
    } else {
      countDown(time)
    }
  }


  const nextQuestion = () => {
    let answerId = questions[currentQuestion].answers._id
    let correctId = answerId = questions[currentQuestion].correctAnswer
    const next = currentQuestion + 1
    editScore(currentScore._id,
      {
        answers: answers
      })

    if (next < questions.length) {
      setCurrentQuestion(next)
    } else {
      editScore(currentScore._id, {
        submitted: true
      }).then(
        navigate(`/student/courses/${id}/exam/done`))
    }
  }

  const lastQuestion = () => {
    setCurrentQuestion(currentQuestion - 1)
  }



  if (!exam || !questions) {
    return ""
  }

  const nextButtonText = currentQuestion === questions.length - 1 ? 'Submit' : 'Next'

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "800px",
            mt: 28
          }}
        >

          <CardContent >
            <ListItem sx={{ fontSize: "50px" }}>{exam.name}</ListItem>
            {console.log(exam.time)}
            <ListItem><AlarmIcon />
              {/* {setInterval(countDown(exam.time), 1000)} */}
            </ListItem>
            <ListItem sx={{ fontSize: "30px" }} >
              {currentQuestion + 1}. {questions[currentQuestion].content}
            </ListItem>
            <Table>
              {questions[currentQuestion].answers.map((answer, i) => {
                const isSelected = selected === answer._id ||
                  answers[currentQuestion] === answer._id
                return (
                  <TableRow
                    key={answer._id}
                    selected={isSelected}
                    onClick={() => { selectedHandle(answer._id, currentQuestion) }}
                  >
                    <TableCell sx={{ fontSize: "20px" }} >
                      {`${tags[i]}. ${answer.content}`}
                    </TableCell>

                  </TableRow>
                )
              })}
            </Table>
          </CardContent>


          <Box
            sx={{

              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            {currentQuestion <= 0 ? <Button variant="contained" disabled={true} >Previous</Button>
              : (
                <Button variant="contained" onClick={lastQuestion}>Previous</Button>
              )
            }
            <Button variant="contained" onClick={nextQuestion} sx={{ ml: 3 }}>{nextButtonText}</Button>
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default TakingExams