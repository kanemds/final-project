
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


  const course = item

  const [open, setOpen] = React.useState(false);

  const findExams = exams && exams.filter((item) => {

    if (!course) {
      return false
    }

    const currentExamIds = course.exams
    return currentExamIds.includes(item._id.toString())
  })

  if (!exams) {
    return ""
  }

  const startExam = (examId) => {
    const score = getScoreByExamId(examId)
    if (score) {
      newScore({
        score: 0,
        submitted: false
      }).then(navigate(`/student/courses/${examId}/exam`))
    } else {
      editScore(examId).then(navigate(`/student/courses/${examId}/exam`))
    }
  }


  // create new score if last known score has passed submission time
  // get all scores that has a created date
  // if any score Created date is within last X minutes
  // then the play button will reuse that "existing" score id
  // then navigate to new exam





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
                    <TableCell align="center"><h2>Time Attempt</h2></TableCell>
                    <TableCell align="center"><h2>Highest Score</h2></TableCell>
                    <TableCell align="center"><h2>Start Exams</h2></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {findExams.map(each => (

                    < TableRow key={each._id} >
                      <TableCell component="th" scope="row">
                        <h3>{each.name}</h3>
                      </TableCell>
                      <TableCell align="center"> <h3>{each.questions.length}</h3></TableCell>
                      <TableCell align="center"><h3>1:30</h3></TableCell>
                      <TableCell align="center"><h3>0/2</h3></TableCell>

                      <TableCell align="center"><h3>%</h3></TableCell>

                      <TableCell align="center"  >
                        <PlayCircleOutlineOutlinedIcon
                          sx={{
                            fontSize: "40px",
                            color: "Green"
                          }}
                          onClick={() => { startExam(each._id) }}
                        />
                      </TableCell>
                    </TableRow>

                  ))}
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

