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
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const TakingExams = () => {
  const navigate = useNavigate();

  const { userId, lastIncomplete } = useContext(LoginContext)
  const { getScoreByExamId, editScore, newScore } = useScore()
  const { id } = useParams()
  const { exam, getExam } = useExam()
  const questions = exam.questions
  const [selected, setSelected] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [examId, setExamId] = useState()
  const [remaining, setRemaining] = useState(0)
  const tags = ["A", "B", "C", "D", "E", "F", "G", "H"]
  const currentScore = lastIncomplete || getScoreByExamId(id)
  const [newExam, setNewExam] = useState()

  useEffect(() => {

    // if (!exam) {
    //   examId && getExam(examId).then((data) => {
    //     setNewExam(data)
    //   })
    // }

    if (answers.length === 0 && currentScore && currentScore.answers && currentScore.answers.length > 0) {
      setAnswers(currentScore.answers)
    }

    if (remaining === 0 && exam && currentScore) {
      const endTime = new Date(currentScore.created).getTime() + exam.timeLimit;
      const currentTime = new Date().getTime();
      const remainingTime = (endTime - currentTime) / 1000


      if (!isNaN(remainingTime)) {
        setRemaining(remainingTime);
      }
    }
  }, [answers, currentScore, getExam, remaining, setRemaining])

  const children = ({ remainingTime }) => {
    // const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime) / 60)
    const seconds = remainingTime % 60
    console.log({ remainingTime, remaining, minutes, exam })
    if (minutes <= 0) {
      return <p>{seconds}sec</p>
    }
    return <p>{minutes}mins</p>
  }

  const selectedHandle = (answerId, currentQuestion) => {
    const newAnswers = answers
    newAnswers[currentQuestion] = answerId
    setSelected(answerId)
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    let answerId = questions[currentQuestion].answers._id;
    let correctId = (answerId = questions[currentQuestion].correctAnswer);
    const next = currentQuestion + 1;
    editScore(currentScore._id, {
      answers: answers,
    });

    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      editScore(currentScore._id, {
        submitted: true,
      }).then(navigate(`/student/courses/${id}/exam/done`));
    }
  };

  const lastQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  if (!exam || !questions || !currentScore) {
    return "loading"
  }

  const nextButtonText =
    currentQuestion === questions.length - 1 ? "Submit" : "Save and Continue";
  const color = exam.timeLimit / 1000

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "800px",
            mt: 28,
          }}
        >
          <CardContent>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pr: 6,
              }}
            >
              <h1>{exam.name}</h1>
              {remaining !== 0 && currentScore && exam && (
                <CountdownCircleTimer
                  onComplete={() => {
                    if (currentScore) {
                      return editScore(currentScore._id, {
                        submitted: true,
                      }).then(navigate(`/student/courses/${id}/exam/done`));
                    }
                  }}
                  isPlaying={true}
                  duration={exam ? exam.timeLimit / 1000 : 999999}
                  initialRemainingTime={remaining}
                  size={80}
                  colors={[
                    "#093d9c",
                    "#0794b0",
                    "#07b067",
                    "#07b029",
                    "#decc0d",
                    "#cf7f11",
                    "#db2a0b",
                  ]}
                  updateInterval={10}
                  colorsTime={[
                    color,
                    color * 0.7,
                    color * 0.5,
                    color * 0.3,
                    color * 0.15,
                    color * 0.1,
                    0,
                  ]}
                >
                  {children}
                </CountdownCircleTimer>
              )}
            </ListItem>
            <ListItem sx={{ fontSize: "30px" }}>
              {currentQuestion + 1}. {questions[currentQuestion].content}
            </ListItem>
            <Table>
              {questions[currentQuestion].answers.map((answer, i) => {
                const isSelected =
                  selected === answer._id ||
                  answers[currentQuestion] === answer._id;
                return (
                  <TableRow
                    key={answer._id}
                    selected={isSelected}
                    onClick={() => {
                      selectedHandle(answer._id, currentQuestion);
                    }}
                  >
                    <TableCell sx={{ fontSize: "20px" }}>
                      {`${tags[i]}. ${answer.content}`}
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </CardContent>

          <Box
            sx={{
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            {currentQuestion <= 0 ? (
              <Button variant="contained" disabled={true}>
                Previous
              </Button>
            ) : (
              <Button variant="contained" onClick={lastQuestion}>
                Previous
              </Button>
            )}
            <Button variant="contained" onClick={nextQuestion} sx={{ ml: 3 }}>
              {nextButtonText}
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default TakingExams;
