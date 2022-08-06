import * as React from 'react';
import PropTypes from 'prop-types';
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


function Row({ item }) {
  const course = item

  const { exams } = useExams()
  const [open, setOpen] = React.useState(false);

  const findExams = exams && exams.filter((item) => {
    if (!course) {
      return false
    }
    const currentExamIds = course.exams
    return currentExamIds.includes(item._id.toString())
  })
  console.log(findExams)
  // const findExams = exams.filter(item => item._id === course.exams.toString())
  // console.log(findExams)

  if (!exams) {
    return ""
  }


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {course.name}
        </TableCell>
        <TableCell align="right">{new Date(course.created).toLocaleDateString('en-US')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Exams
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Total Questions</TableCell>
                    <TableCell>Time Limit</TableCell>
                    <TableCell align="right">Time Attempt</TableCell>
                    <TableCell align="right">Highest Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {findExams.map(each => (
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {each.name}
                      </TableCell>
                      <TableCell>{each.questions.length}</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable() {
  const data = useCourses()

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Course name</TableCell>
            <TableCell align="right">Create Date</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <Row key={item._id} item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
