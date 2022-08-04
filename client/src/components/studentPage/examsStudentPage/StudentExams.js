
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const StudentExams = (props) => {
  const { exams } = props

  return exams && exams.length > 0 && (
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
                Question: {exam.questions.length}
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

export default StudentExams







