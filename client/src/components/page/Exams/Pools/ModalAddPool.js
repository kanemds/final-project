import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { api_base } from 'config'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [name, nameState] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  return (
    <div>
      <Button onClick={handleOpen}>Add Exam</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Pool Name <textarea value={name} onChange={(event) => nameState(_prev => event.target.value)} rows="1" cols="30"></textarea>
          </Typography>
          <Button onClick={() => 
          axios.post(`${api_base}/exams/new`, {name})
          .then(exam => {
            navigate(`/exams/${exam.data._id}/questions`);
              }
            )}>Create</Button>
        </Box>
      </Modal>
    </div>
  );
}

// talk to kanem about questions and pools tables
