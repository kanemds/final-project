import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

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

export default function BasicModal({setCategories}) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  let {id} = useParams();
  return (
    <div>
      <Button onClick={handleOpen}>Add Category</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Category Name <textarea value={content} onChange={(event) => setContent(_prev => event.target.value)} rows="1" cols="30"></textarea>
          </Typography>
          <Button 
            onClick={async() => {
              const categoryDoc = await axios.post(`${api_base}/categories/new`, {content});
              const category = categoryDoc.data;
              const exam = await axios.post(`${api_base}/exams/${id}/categories/push`, {category});
              setCategories(prev => {
                const newPrev = [...prev];
                newPrev.push(category);
                return newPrev;
              });
              handleClose();
              setContent(_prev => "");
            }
          }>Create</Button>
        </Box>
      </Modal>
    </div>
  );
}
