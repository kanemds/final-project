import React, { useContext } from 'react'
import StudentExams from './StudentExams'
import { LoginContext } from 'Contexts/LoginContext'
import useCourses from '../StudentCourses/useCourse'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const ExamStudentPage = () => {

  // cours.exam id === exams print

  const data = useCourses()
  console.log(data)
  const { userId, students } = useContext(LoginContext)
  
  const exams = data.map(item => item.exams)
  console.log(exams)




  if (!exams) {
    return ''
  }


  return (
    <>
      {
        exams.map((exam) => (

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
                <div
                  key={exam.name}
                  style={{
                    textDecoration: 'none',
                    color: "black",
                    fontWeight: 'bold'
                  }}
                >
                  Exam: {exam.name}
                </div>
              </Typography>
              <Typography sx={{ fontSize: 20 }} gutterBottom>

              </Typography>
              <Typography sx={{ fontSize: 20 }} gutterBottom>
                Attempt: ??
              </Typography>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Time limit ? Hr ? Min
              </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        ))

      }
    </>
  )

}


export default ExamStudentPage