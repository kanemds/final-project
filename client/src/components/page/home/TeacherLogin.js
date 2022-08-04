import * as React from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { LoginContext } from 'Contexts/LoginContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

import { api_base } from 'config'
// import useStudentHomePage from 'components/teacherPage/home/useStudentHomePage';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TeacherLogin({ open, handleClose }) {
  let navigate = useNavigate();
  const { teachers, userId, setUserId } = useContext(LoginContext)

  const [loginName, setLoginName] = useState(null)


  const teacher = teachers.find((item) => item.user === userId) || teachers[0]

  const handleChange = (e) => {
    setLoginName(e.target.value)
  }

  const login = () => {
    setLoginName(loginName)
    setUserId(loginName)
    // navigate(`/teacher/${loginName}/home`)
  }
  if (!teacher) {
    return ""
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component="form" sx={{
          ...style,
          width: '80%', maxWidth: '400px',
          '& .MuiTextField-root': { m: 1, width: '20ch' }
        }}
          noValidate
          autoComplete="off"
        >

          <TextField
            required
            id="standard-required"
            label="User name"
            variant="standard"
            onChange={handleChange}
            onSubmit={login}
          />
          <br />
          <Button onClick={() =>
            axios.post(`${api_base}/teacher/login`, { user: loginName }, { withCredentials: true })
              .then((data) => {
                sessionStorage.setItem('user', data.data._id)
                setUserId(data.data._id)
                navigate(`/teacher/home`)
              })
          }>
            Log in
          </Button>
        </Box>
      </Modal>
    </div >
  );
}
