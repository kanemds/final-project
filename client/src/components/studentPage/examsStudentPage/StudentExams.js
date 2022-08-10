import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useCourses from '../StudentCourses/useCourse';
import useExams from 'components/page/Exams/useExams';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from 'Contexts/LoginContext';
import { useContext } from 'react';
import useScore from 'components/hooks/useScore';



function Row({ item, exams }) {
  const navigate = useNavigate()
  const { newScore, editScore, scores, getScoreByExamId } = useScore()
  const { userId, lastIncomplete, saveLastIncomplete } = useContext(LoginContext)
  const course = item
  const [open, setOpen] = React.useState(false);

  const findExams = exams && exams.filter((item) => {

    if (!course) {
      return false
    }

    const currentExamIds = course.exams
    return currentExamIds.includes(item._id.toString())
  })


  const getTime = (time) => {
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const texthour = Math.floor(time / hour)
    const textMinute = Math.floor((time % hour) / minute)
    const textSecond = Math.floor((time % minute) / second)
    return `${texthour} : ${textMinute}`
  }


  if (!exams) {
    return ""
  }

  const startExam = (examId, score, maxAttempt, time) => {
    const incompleteScore = score.filter((item) => {
      const min = 30
      const endTime = new Date(new Date(item.created).getTime() + min * 60000);
      return !item.submitted && item.created < endTime
    })
    const lastScore = incompleteScore && incompleteScore[0]

    if (lastScore) {
      saveLastIncomplete(lastScore)
    } else {
      newScore({
        score: 0,
        student: userId,
        exam: examId,
        submitted: false
      }).then((scoreDoc) => {
        saveLastIncomplete(scoreDoc)
        navigate(`/student/courses/${examId}/exam`)
      })
    }
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          <h2>{course.name}</h2>
        </TableCell>
        <TableCell align="center"  ><h2>{new Date(course.created).toLocaleDateString('en-US')}</h2></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <h2 >Exams</h2>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow >
                    <TableCell ><h2>Name</h2></TableCell>
                    <TableCell align="center"><h2>Total Questions</h2></TableCell>
                    <TableCell align="center"><h2>Time Limit</h2></TableCell>
                    <TableCell align="center"><h2>No. of Attempts</h2></TableCell>
                    <TableCell align="center"><h2>Highest Score</h2></TableCell>
                    <TableCell align="center"><h2>Start Exams</h2></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {findExams.map(each => {
                    const score = scores.filter((item) => item.exam === each._id)
                    const maxAttempt = 20
                    const attempts = score.length
                    const examScores = attempts > 1 && score && score.map((item) => item.score)
                    const highestScore = attempts > 1 && Math.max(...examScores)
                    const scorePercentage = attempts > 1 ?
                      `${Math.trunc(((highestScore / each.questions.length) * 100))}%` : 'N/A'

                    return (
                      < TableRow key={each._id} >
                        <TableCell component="th" scope="row">
                          <h3>{each.name}</h3>
                        </TableCell>
                        <TableCell align="center"> <h3>{each.questions.length}</h3></TableCell>
                        <TableCell align="center"><h3>{getTime(each.time)}</h3></TableCell>
                        <TableCell align="center"><h3>{attempts}/2</h3></TableCell>

                        <TableCell align="center"><h3>{scorePercentage}</h3></TableCell>

                        <TableCell align="center"  >
                          {attempts < maxAttempt ? (<PlayCircleOutlineOutlinedIcon
                            sx={{
                              fontSize: "40px",
                              color: "Green"
                            }}
                            onClick={() => { startExam(each._id, score, maxAttempt, each.time) }}
                          />) : 'Completed'}

                        </TableCell>
                      </TableRow>
                    )
                  }
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment >
  );
}


export default function CollapsibleTable() {

  const { exams } = useContext(LoginContext)
  const data = useCourses()
  // const { exams } = useExams()
  return (
    <TableContainer component={Paper}
      sx={{
        mt: 6
      }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center"><h1>Course name</h1></TableCell>
            <TableCell align="center"><h1>Create Date</h1></TableCell>

          </TableRow>
        </TableHead>
        <TableBody >
          {data.map(item => (
            <Row key={item._id} item={item} exams={exams} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
