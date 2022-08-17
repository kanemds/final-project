import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { UserList } from "./userlist";
import { api_base } from "config";
import Student from "./Students";
import { CropSquareSharp, Email, GolfCourseSharp } from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
} from "@mui/material";
import useStudent from "./useStudent";
import TeacherCoursesShow from "components/page/courses/TeacherCoursesShow";
import TeacherCourses from "components/page/courses/TeacherCourses";
import useTeacherCourses from "components/page/courses/useTeacherCourses";
import { flexbox, height } from "@mui/system";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 900,
//   height: 600,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   display: "flexbox",
//   alignItems: "center",
//   justifyContent: "center",
// };

export const EditStudent = ({ courses }) => {
  const [open, setOpen] = React.useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const [id, setId] = useState("");
  const [course, setCourse] = useState("");
  const { data } = useTeacherCourses();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (location.state) {
      setFirstName(location.state.firstname);
      setLastName(location.state.lastname);
      setEmail(location.state.email);
      setId(location.state._id);
      // setCourse(location.state.course);
    }
  }, [location.state]);
  return (
    <div>

      <Box sx={{
        mt: 12,
        display: "flex",
        justifyContent: "center"
      }}>

        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: "column",
            '& > :not(style)': {
            },
            width: 600,
            height: 650
          }}
          variant="outlined"
        >
          <Typography sx={{ m: 3 }} variant="h3" component="div" gutterBottom>
            Edit Student
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ m: 3 }}
          >
            First Name{" "}
            <TextField
              value={firstname}
              onChange={(event) => setFirstName((_prev) => event.target.value)}
              rows="1"
              cols="70"
            ></TextField>
          </Typography>
          <Typography
            sx={{ m: 3 }}
            id="modal-modal-title"
            variant="h5"
            component="h2"


          >
            Last Name{" "}
            <TextField
              value={lastname}
              onChange={(event) => setLastName((_prev) => event.target.value)}
              rows="1"
              cols="70"
            ></TextField>
          </Typography>
          <Typography
            sx={{ m: 3 }}
            id="modal-modal-title"
            variant="h5"
            component="h2"

          >
            Email{" "}
            <TextField
              sx={{ ml: 7 }}
              value={email}
              onChange={(event) => setEmail((_prev) => event.target.value)}
              rows="1"
              cols="70"
            ></TextField>
          </Typography>
          {/* <FormControl style={{ minWidth: 195, paddingLeft: 411 }}> */}
          {/* <InputLabel
            variant="h5"
            id="demo-simple-select-label"
            sx={{ paddingLeft: 60 }}
          >
            Courses
          </InputLabel>
          <Select
            labelId="demo-multiple-select-label"
            id="demo-multiple-select"
            // native={true}
            // multiple
            value={course}
            label="Course"
            open={open}
            onClick={handleOpen}
            renderValue={(selected) => course.name}
          // style={{ width: 200 }}
          >
            {data.map((course) => (
              <MenuItem
                id={course.id}
                key={course.id}
                value={course.id}
                onClick={
                  (event) => {
                    event.stopPropagation();
                    handleClose();
                    setCourse(course._id);
                  }
                  //   axios
                  //     .put(`${api_base}/teacher/student/${id}`, {
                  //       course,
                  //     })
                  //     .then((response) => {
                  //       navigate(`/teacher/students`);
                  //     })
                }
              >
                {course.name}
              </MenuItem>
            ))}
          </Select> */}
          {/* </FormControl> */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={() =>
                axios
                  .put(`${api_base}/teacher/student/${id}`, {
                    firstname,
                    lastname,
                    email,
                    course,
                  })
                  .then((response) => {
                    navigate(`/teacher/students`);
                  })
              }
            >
              Update
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default EditStudent;
