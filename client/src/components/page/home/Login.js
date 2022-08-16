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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { api_base } from 'config'
// import useStudentHomePage from 'components/studentPage/home/useStudentHomePage';

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

export default function Login({ open, handleClose }) {
  let navigate = useNavigate();

  const [role, setRole] = React.useState('');

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };


  const { students, userId, setUserId, teachers, setTeacherId } = useContext(LoginContext)

  const [loginName, setLoginName] = useState(null)

  const teacher = teachers.find((item) => item.user === userId) || teachers[0]
  const student = students.find((item) => item.user === userId) || students[0]

  const handleChange = (e) => {
    setLoginName(e.target.value)
  }

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      // login()
      handleLogin()
    }
  }

  const login = () => {
    setLoginName(loginName)
    setUserId(loginName)
    // navigate(`/student/${loginName}/home`)
  }

  const handleLogin = () => {
    if (role === teacher && loginName) {
      axios.post(`${api_base}/teacher/login`, { user: loginName }, { withCredentials: true })
        .then((data) => {
          sessionStorage.setItem('teacherId', data.data._id)
          setTeacherId(data.data._id)
          navigate(`/teacher/home`)
        })
    }
    if (role === student && loginName) {
      axios.post(`${api_base}/student/login`, { user: loginName }, { withCredentials: true })
        .then((data) => {
          sessionStorage.setItem('user', data.data._id)
          setUserId(data.data._id)
          navigate(`/student/courses`)
        })
    }
  }

  if (!student) {
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
          '& .MuiTextField-root': { m: 1, width: '45ch' }
        }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Please select your role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Role"
                onChange={handleChangeRole}
              >
                <MenuItem value={teacher}>Teacher</MenuItem>
                <MenuItem value={student}>Student</MenuItem>

              </Select>
            </FormControl>
          </Box>

          <TextField
            required
            id="standard-required"
            label="User name"
            variant="standard"
            onChange={handleChange}
            onKeyDown={handleSubmit}
            onSubmit={login}
            autoComplete="off"
            autoCapitalize="off"
          />
          <br />
          <Button onClick={handleLogin}>
            Log in
          </Button>
        </Box>
      </Modal>
    </div >
  );
}
