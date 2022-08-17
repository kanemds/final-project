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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { pink } from "@mui/material/colors";


const Students = () => {
  const { removeUser } = useContext(GlobalContext);
  const { editUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const student = useStudent();
  const { data } = useTeacherCourses();

  if (!data) {
    return "loading...";
  }
  return (
    <>
      <Box
        sx={{ m: 6 }}
      >
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

              <Box
                sx={{
                  display: "flex"
                }}>
                <AutoStoriesIcon fontSize="large" sx={{ color: blue[500], mr: 1 }} />

                {data.map(course => {
                  if (course.students.includes(item._id)) {
                    return (
                      <Typography
                        sx={{ ml: 1, mr: 1 }}
                      >
                        {course.name}
                      </Typography>
                    )
                  }
                })}
              </Box>
              <Divider variant="middle" />
              <Box sx={{ m: 2 }}></Box>

              <HighlightOffIcon variant="contained"
                onClick={() => removeUser(item._id)}

                fontSize="large" sx={{ color: pink[500], mr: 3 }}
                gutterBottom />

              <BorderColorIcon
                fontSize="large" sx={{ color: blue[500] }}
                onClick={() =>
                  navigate("/teacher/students/edit", { state: item })}
                gutterBottom />

            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Students;
