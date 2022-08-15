import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import { red } from "@mui/material/colors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { api_base } from "config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  height: "15vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1.5vw",
};
const ModalAddExam = ({ setExamsState }) => {
  const [open, setOpen] = React.useState(false);
  const [name, nameState] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Add Exam
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ display: "flex", gap: "1.5vw" }}
          >
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <AcUnitRoundedIcon sx={{ color: red[500] }} /> Name (
              {150 - name.length} characters remaining)
            </Box>
          </Typography>
          <TextField
            multiline
            rows={2}
            value={name}
            onChange={(event) => nameState((_prev) => event.target.value)}
            // rows="1"
            cols="30"
          ></TextField>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={async () => {
                const exam = await axios.post(`${api_base}/exams/new`, {
                  name,
                });
                setExamsState((prev) => {
                  const newPrev = [...prev];
                  newPrev.push(exam);
                  return newPrev;
                });
                navigate(`/teacher/exams/${exam.data._id}/questions`);
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalAddExam;
