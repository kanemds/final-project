import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Model from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { api_base } from "config";

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

export default function BasicModel() {
  const [open, setOpen] = React.useState(false);
  const [name, nameState] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  const navigateNewStudent = () => {
    navigate("/students/new");
  };
  return (
    <div>
      <Button onClick={navigateNewStudent}>Add Student</Button>

      <Button
        onClick={() =>
          axios.post(`${api_base}/Students`, { name }).then((Student) => {
            navigate(`/Students/${Student.data._id}`);
          })
        }
      >
        Add Student
      </Button>
    </div>
  );
}
