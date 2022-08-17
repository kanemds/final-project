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
import FindInPageSharpIcon from '@mui/icons-material/FindInPageSharp';
import ReviewExam from '../TakingExams/ReviewExam';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';


function Row({ item, exams }) {
  const navigate = useNavigate();
  const { newScore, seditScore, scores, getScoreByExamId } = useScore();
  const { userId, lastIncomplete, saveLastIncomplete } =
    useContext(LoginContext);
  const course = item;
  const [open, setOpen] = React.useState(false);



  const findExams =
    exams &&
    exams.filter((item) => {
      if (!course) {
        return false;
      }

      const currentExamIds = course.exams;
      return currentExamIds.includes(item._id.toString());
    });

  if (!exams) {
    return "";
  }

  const startExam = (course, examId, score, maxAttempt, time) => {
    const incompleteScore = score.filter((item) => {
      // const oneMinute = time 
      const endTime = new Date(item.created).getTime() + time;
      const currentTime = new Date().getTime();
      return !item.submitted && currentTime < endTime;
    });
    const lastScore = incompleteScore && incompleteScore[0];
    if (lastScore) {
      saveLastIncomplete(lastScore);
      navigate(`/student/courses/${examId}/exam`);
    } else {
      newScore({
        score: 0,
        student: userId,
        course: course,
        exam: examId,
        submitted: false,
      }).then((scoreDoc) => {
        saveLastIncomplete(scoreDoc.data);
        navigate(`/student/courses/${examId}/exam`);
      });
    }
  };

  return (
    <React.Fragment>

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
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
        <TableCell align="center">
          <h2>{new Date(course.created).toLocaleDateString("en-US")}</h2>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <h2>Exams</h2>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>

                  <TableRow >
                    <TableCell ><h2>Name</h2></TableCell>
                    <TableCell align="center"><h2>Total Questions</h2></TableCell>
                    <TableCell align="center"><h2>Time Limit</h2></TableCell>
                    <TableCell align="center"><h2>No. of Attempts</h2></TableCell>
                    <TableCell align="center"><h2>Highest Score</h2></TableCell>
                    <TableCell align="center"><h2>Exams</h2></TableCell>
                  </TableRow>
                </TableHead >
                <TableBody>
                  {findExams.map(each => {
                    console.log(each.timeLimit)
                    if (!each.activate) {
                      return ""
                    }
                    const score = scores && scores.filter((item) => item.exam === each._id && item.course === course._id)
                    const attempts = score.length
                    const submitted = score.filter((item) => item.submitted).length
                    const examScores = attempts >= 1 && score && score.map((item) => item.score)
                    const totalScores = attempts >= 1 && score && score.map((item) => item.totalScore)
                    const highestScore = attempts >= 1 && Math.max(...examScores)
                    const highestResult = score.find(highest => highest.score === highestScore)


                    const scorePercentage = attempts >= 1 && totalScores[0] > 0 ?
                      `${Math.trunc(((highestScore / totalScores[0]) * 100))}%` : 'N/A'
                    let canStartExam = true
                    if (submitted >= each.attemptsLimit && each.attemptsLimit != null) {
                      canStartExam = false
                      if (
                        score &&
                        score[0] &&
                        new Date().getTime() >
                        new Date(
                          new Date(score[0].created).getTime() +
                          each.timeLimit
                        ) &&
                        submitted >= each.attemptsLimit
                      ) {
                        canStartExam = false;
                      }
                    }

                    return (
                      <TableRow key={each._id}>
                        <TableCell component="th" scope="row">
                          <h3>{each.name}</h3>
                        </TableCell>
                        <TableCell align="center"> <h3>{each.questions.length}</h3></TableCell>
                        <TableCell align="center"><h3>{each.timeLimit / 60 / 1000} Minutes</h3></TableCell>
                        {
                          !each.attemptsLimit ? <TableCell align="center"><h3>Practice</h3></TableCell> :
                            <TableCell align="center"><h3>{attempts}/{each.attemptsLimit}</h3></TableCell>
                        }
                        <TableCell align="center"><h3>{scorePercentage}</h3></TableCell>
                        <TableCell align="center"  >

                          {canStartExam ? (<Button
                            onClick={() => { startExam(course, each._id, score, each.attemptsLimit, each.timeLimit) }}>
                            Start
                          </Button>)
                            :
                            <Button onClick={() => navigate(`/student/score/${highestResult._id}/review`)}>
                              Review
                            </Button>
                          }
                        </TableCell>
                      </TableRow >
                    );
                  })}
                </TableBody >
              </Table >
            </Box >
          </Collapse >
        </TableCell >
      </TableRow >
    </React.Fragment >
  );
}

export default function CollapsibleTable() {
  const { exams, userId, students } = useContext(LoginContext)
  const data = useCourses()
  const currentStudent = students.find(id => id._id === userId)


  const [ready, setReady] = useState()



  if (!exams || !userId || !students || !currentStudent) {

    return "loading";
  }
  return (
    <>
      <Box
        sx={{
          m: 10
        }}
      >

        <h1>{currentStudent.firstname} {currentStudent.lastname}</h1>
        <br />
        <TableContainer
          component={Paper}
        >

          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">
                  <h1>Course name</h1>
                </TableCell>
                <TableCell align="center">
                  <h1>Create Date</h1>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <Row key={item._id} item={item} exams={exams} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
