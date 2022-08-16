import { LoginContext } from 'Contexts/LoginContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItem from '@mui/material/ListItem';
import { Box, Button, Table, TableCell, TableRow } from '@mui/material';
import useExam from 'components/page/Exams/useExam';
import { useNavigate } from 'react-router-dom';
import useScore from 'components/hooks/useScore';
import { makeStyles } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const ReviewExam = () => {


  const navigate = useNavigate()
  const { scoreId } = useParams()
  const { getScoreByScoreId } = useScore()
  const { getExam } = useExam()
  const score = getScoreByScoreId(scoreId)
  const examId = score && score.exam
  const [exam, setExam] = useState()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const tags = ["A", "B", "C", "D", "E", "F", "G", "H"]
  const [selected, setSelected] = useState([])



  const lastQuestion = (props) => {
    setCurrentQuestion(currentQuestion - 1)
  }

  const nextQuestion = () => {
    const next = currentQuestion + 1
    if (next < questions.length) {
      setCurrentQuestion(next)
    } else {
      navigate('/student/courses')
    }
  }

  useEffect(() => {
    if (!exam) {
      examId && getExam(examId).then((data) => {
        setExam(data)
      })
    }
  }, [examId, getExam, exam])


  if (!scoreId || !score || !exam) {
    return 'loading...'
  }



  const questions = exam.questions
  const nextButtonText = currentQuestion === questions.length - 1 ? 'Exit' : 'Next'

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
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: "space-between",
                pr: 6
              }}
            >
              <h1>{exam.name}</h1>
            </ListItem>
            <ListItem sx={{ fontSize: "30px" }} >
              {currentQuestion + 1}. {questions[currentQuestion].content}
            </ListItem>
            <Table>
              {questions[currentQuestion].answers.map((answer, i) => {
                const correct = questions[currentQuestion].correctAnswer === answer._id
                const isSelected = score.answers[currentQuestion] === answer._id
                let userSelected = ''

                if (isSelected && isSelected === correct) {
                  console.log({ isSelected, correct })
                  userSelected = 'correct'
                }
                if (isSelected && isSelected !== correct) {
                  userSelected = 'incorrect'
                }

                // if (correct === answer._id) {
                //   return (
                //     <TableRow
                //       key={answer._id}
                //       selected={correct}
                //       sx={{
                //         "&.Mui-selected, &.Mui-selected:hover": {
                //           backgroundColor: "#c8e6c9"
                //         }
                //       }}
                //     >
                //       <TableCell
                //         sx={{
                //           fontSize: "20px",
                //           backgroundColor: "#f48fb1"
                //         }} >
                //         {`${tags[i]}. ${answer.content}`}
                //       </TableCell>
                //     </TableRow>)
                // }
                // } else {

                return (
                  <TableRow
                    key={answer._id}
                    selected={correct}
                    data-selected={userSelected}
                    sx={{
                      "&.Mui-selected, &.Mui-selected:hover": {
                        backgroundColor: "#c8e6c9"
                      }
                    }}

                  >

                    <TableCell
                      sx={{
                        fontSize: "20px",
                      }}

                    >
                      {`${tags[i]}. ${answer.content}`}
                      {userSelected === 'correct' && <CheckIcon />}
                      {userSelected === 'incorrect' && <ClearIcon />}
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

export default ReviewExam