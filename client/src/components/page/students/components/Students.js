import React, { useContext, useEffect, useState } from "react";
import useStudent from "./useStudent";
import { GlobalContext } from "../context/GlobalState";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicModal from "./ModelAddStudent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import useTeacherCourses from "components/page/courses/useTeacherCourses";
import "./Students.css";

const Students = () => {
  const { removeUser } = useContext(GlobalContext);
  const { editUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const student = useStudent();
  const { data } = useTeacherCourses();

  const getCourseName = (currentCourseId) => {
    let currentCourseName = "";
    if (currentCourseId) {
      // if there is a course id then we'll loop through the data to get the course name using courseId
      for (let course of data) {
        if (currentCourseId == course._id) {
          currentCourseName = course.name;
        }
      }
    }
    if (!data) {
      return "loading...";
    }
    return currentCourseName;
  };
  const getAllCourseNames = (arrayOfCourseIds) => {
    return arrayOfCourseIds.map(getCourseName);
  };

  const BoxShadowDiv = styled("div")(
    ({ theme }) => `
margin: ${theme.spacing(2)};
padding: ${theme.spacing(2)};
border: 1px solid black;
box-shadow: ${theme.shadows[12]};`
  );
  return (
    <>
      <h1 sx={{ color: blue }}>Add Students</h1>
      <BasicModal />
      {student.map((item) => (
        <Card
          key={item._id}
          sx={{
            minWidth: 50,
            margin: 1,
            "&:hover": {
              boxShadow: "0 2px 5px 1px",
              cursor: "pointer",
            },
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 24 }} gutterBottom>
              <Link
                to={`/teacher/students/${item._id}/`}
                key={item._id}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bolder",
                }}
              >
                {item.firstname} {item.lastname}
                <Divider variant="middle" />
                {item.email}
              </Link>
            </Typography>

            <Divider variant="middle" />
            <Box sx={{ m: 2 }}></Box>
            <ListItemButton component="enrolledcourse" href="/teacher/courses">
              <AutoStoriesIcon fontSize="large" sx={{ color: blue[500] }} />

              <ListItemText
                primary={getAllCourseNames(item.course).join(", ")}
              />
            </ListItemButton>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}></Box>
            <Button
              variant="outlined"
              onClick={() =>
                navigate("/teacher/students/edit", { state: item })
              }
              sx={{ fontSize: 15 }}
              gutterBottom
            >
              Edit Student Account
            </Button>
            <Button
              variant="outlined"
              onClick={() => removeUser(item._id)}
              sx={{ fontSize: 15 }}
              gutterBottom
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Students;
