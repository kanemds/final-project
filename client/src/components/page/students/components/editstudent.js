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
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import useStudent from "./useStudent";
import TeacherCoursesShow from "components/page/courses/TeacherCoursesShow";
import TeacherCourses from "components/page/courses/TeacherCourses";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ courses }) {
  const [open, setOpen] = React.useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const [id, setId] = useState("");
  const [course, setCourse] = useState("");

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
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          First Name{" "}
          <textarea
            value={firstname}
            onChange={(event) => setFirstName((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Last Name{" "}
          <textarea
            value={lastname}
            onChange={(event) => setLastName((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Email{" "}
          <textarea
            value={email}
            onChange={(event) => setEmail((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Courses</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={course}
            label="Course"
          >
            {courses.map((course) => (
              <MenuItem
                id={course.id}
                value={course.name}
                onClick={() =>
                  axios
                    .put(`${api_base}/teacher/student/${id}`, {
                      course,
                    })
                    .then((response) => {
                      navigate(`/teacher/students`);
                    })
                }
              >
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={() =>
            axios
              .put(`${api_base}/teacher/student/${id}`, {
                firstname,
                lastname,
                email,
              })
              .then((response) => {
                navigate(`/teacher/students`);
              })
          }
        >
          Edit Student Account
        </Button>
      </Box>
    </div>
  );
}
