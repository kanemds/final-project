import React, { useContext, useEffect, useState } from "react";
import useStudent from "./useStudent";
import { GlobalContext } from "../context/GlobalState";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { api_base } from "config";
import { shadows } from "@mui/system";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicModal from "./ModelAddStudent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useTeacherCourses from "components/page/courses/useTeacherCourses";

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
    return currentCourseName;
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
      <h1>Add Students</h1>
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
                  fontWeight: "bold",
                }}
              >
                {item.firstname} {item.lastname} {item.email}
              </Link>
            </Typography>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}></Box>
            <Button
              onClick={() =>
                navigate("/teacher/students/edit", { state: item })
              }
              sx={{ fontSize: 20 }}
              gutterBottom
            >
              Edit Student Account
            </Button>
            <Button
              onClick={() => removeUser(item._id)}
              sx={{ fontSize: 20 }}
              gutterBottom
            >
              Delete
            </Button>

            <Divider variant="middle" />
            <Box sx={{ m: 2 }}></Box>
            <ListItemButton component="a" href="/teacher/courses">
              <ListItemText primary={getCourseName(item.course)} />
            </ListItemButton>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Students;
