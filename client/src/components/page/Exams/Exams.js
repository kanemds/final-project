<<<<<<< HEAD

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react'
import { shadows } from '@mui/system';
import { styled } from "@mui/material/styles";

import BasicModal from './ModalAddExam';
import { Link } from 'react-router-dom'
import { api_base } from 'config'
import useExams from './useExams'
import { borderBottom } from '@mui/system';

const Exams = () => {

  const exams = useExams();
  const BoxShadowDiv = styled('div')(
=======
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { shadows } from "@mui/system";
import { styled } from "@mui/material/styles";

import BasicModal from "./ModalAddExam";
import { Link } from "react-router-dom";
import { api_base } from "config";
import useExams from "./useExams";
import { borderBottom } from "@mui/system";

const Exams = () => {
  const exams = useExams();
  const BoxShadowDiv = styled("div")(
>>>>>>> c61c127dfa62e166196b65223782789a60f42162
    ({ theme }) => `
    margin: ${theme.spacing(2)};
    padding: ${theme.spacing(2)};
    border: 1px solid black;
    box-shadow: ${theme.shadows[12]};
<<<<<<< HEAD
  `,
=======
  `
>>>>>>> c61c127dfa62e166196b65223782789a60f42162
  );
  return (
    <>
      <h1>Exam Manager</h1>
      <BasicModal />

      {exams.map((exam) => (
        <Card
          key={exam._id}
          sx={{
            minWidth: 50,
            margin: 1,
            "&:hover": {
              boxShadow: "0 2px 5px 1px",
<<<<<<< HEAD
              cursor: "pointer"
            }
          }}
        >
          <CardContent >
            <Typography sx={{ fontSize: 24 }} gutterBottom>
              <Link to={`/teacher/exams/${exam._id}/questions`}
                key={exam.name}
                style={{
                  textDecoration: 'none',
                  color: "black",
                  fontWeight: 'bold'
=======
              cursor: "pointer",
            },
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 24 }} gutterBottom>
              <Link
                to={`/teacher/exams/${exam._id}/questions`}
                key={exam.name}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
>>>>>>> c61c127dfa62e166196b65223782789a60f42162
                }}
              >
                Exam: {exam.name}
              </Link>
            </Typography>
            <Typography sx={{ fontSize: 20 }} gutterBottom>
              Question: {exam.questions.length}
            </Typography>
            <Typography sx={{ fontSize: 20 }} gutterBottom>
              Passing Score: ??
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
<<<<<<< HEAD

              Last Edit: {new Date(exam.created).toLocaleDateString('en-US')}
            </Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>



      ))}



=======
              Last Edit: {new Date(exam.created).toLocaleDateString("en-US")}
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      ))}
>>>>>>> c61c127dfa62e166196b65223782789a60f42162
    </>
  );
};

export default Exams;
