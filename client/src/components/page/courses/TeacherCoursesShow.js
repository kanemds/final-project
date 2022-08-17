
import React, { useContext, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LoginContext } from 'Contexts/LoginContext';
import { pink } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import "./course.css"
import { Button } from '@mui/material';
import useTeacherCourses from './useTeacherCourses'
import Modal from '@mui/material/Modal'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const TeacherCoursesShow = () => {

  // const { remove } = removeCourse
  const { data, removeCourse, addCourse } = useTeacherCourses()
  const { students } = useContext(LoginContext)
  const navigate = useNavigate()


  const [open, setOpen] = React.useState(false);
  const [name, nameState] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 375,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 10,
  };

  return data && data.length > 0 && (
    <>
      <Box
        sx={{ m: 6 }}
      >
        <Typography id="modal-modal-title" variant="h2" component="h2">
          Courses
        </Typography>
        <Button variant="contained" onClick={handleOpen}>Add Course</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              New Course
            </Typography>
            <TextField fullWidth value={name}
              onChange={(event) => nameState(_prev => event.target.value)}
              label="Course Name" id="fullWidth" />

            <Button
              onClick={() => {
                addCourse({ name })
                  .then(setOpen(false))
              }}
            >Create </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Modal>
        {
          data.map((course) => (
            <Card
              key={course._id}
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
                <Typography gutterBottom
                  key={course.name}

                  style={{
                    margin: 0,
                    fontSize: 30,
                    textDecoration: 'none',
                    color: "black",
                    fontWeight: 'bold',
                    ".css-46bh2p-MuiCardContent-root": {
                      padding: "none"
                    }
                  }}
                >
                  <div className='title'>
                    <div className='name'>
                      {course.name}
                    </div>
                  </div>
                </Typography>
                <Typography sx={{ fontSize: 20 }} >
                  Exams: {course.exams.length}
                </Typography>
                <Typography sx={{ fontSize: 20 }} >
                  Students: {course.students.length}
                </Typography>
                <div className='name'>
<<<<<<< HEAD
                  <HighlightOffIcon fontSize="large" sx={{ color: pink[500], mr: 3 }}
=======
                  <HighlightOffIcon fontSize="large" sx={{ color: pink[500] }}
>>>>>>> c04adabd6a0011cb8744d028f482f74c9ac6d48b
                    onClick={() => { removeCourse(course._id) }} />
                  <BorderColorIcon fontSize="large" sx={{ color: blue[500] }}
                    onClick={() => {
                      navigate(`/teacher/courses/${course._id}/edit`)
                    }}
                  />

                </div>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>
          ))
        }
      </Box>
    </>
  )
}

export default TeacherCoursesShow







