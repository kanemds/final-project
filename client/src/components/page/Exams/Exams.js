import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Exam from "./Exam";
import axios from "axios";
import ModalAddExam from "./ModalAddExam";
import { api_base } from "config";
import { Typography } from "@mui/material";

const Exams = () => {
  const [examsState, setExamsState] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      const exams = await axios.get(`${api_base}/exams`);
      setExamsState((_prev) => exams.data);
    };
    getExams();
  }, []);
  return (
    <>   <Box
      sx={{ m: 6 }}
    >
      <Typography id="modal-modal-title" variant="h2" component="h2">
        Exams
      </Typography>

      <ModalAddExam setExamsState={setExamsState} />
      <div>
        {examsState.length > 0 &&
          examsState.map((exam, i) => {
            return <Exam key={i + 1} exam={exam} />;
          })}
      </div>
    </Box>
    </>
  );
};

export default Exams;
