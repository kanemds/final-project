import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { LoginContext } from 'Contexts/LoginContext';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';
import { api_base } from 'config';

const StudentAccount = () => {
  const { students, userId, currentStudent, setCurrentStudent } = useContext(LoginContext)
  console.log(userId)
  const navigate = useNavigate()
  const [edit, setEdit] = useState(true)
  const [info, setInfo] = useState({
    email: currentStudent && currentStudent.email,
    user: currentStudent && currentStudent.user,
  })

  const handleChange = (e) => {
    const type = e.target.id
    setInfo({
      ...info,
      [type]: e.target.value
    })
  }

  const handleSave = async () => {
    await axios.post(`${api_base}/student/${userId}/edit`, info)
    setCurrentStudent({
      ...currentStudent,
      ...info
    })
    setEdit(true)
  }

  console.log({ students, currentStudent })

  if (!students || !currentStudent) {
    return "loading..."
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: "column",
          justifyContent: "center",
          '& > :not(style)': {
          },
          mt: 12,
          width: 600
        }}
        variant="outlined">
        <Typography sx={{ m: 3 }} variant="h3" component="div" gutterBottom>
          Account Setting
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: "center",
            '& > :not(style)': {
            },
            m: 2
          }}

        >
          <TextField sx={{ m: 3 }}
            id="outlined-read-only-input"
            label="First Name"
            disabled
            defaultValue={currentStudent.firstname}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField sx={{ m: 3 }}
            disabled
            id="outlined-read-only-input"
            label="Last Name"
            defaultValue={currentStudent.lastname}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField sx={{ m: 3 }}
            value={info.email}
            onChange={handleChange}
            id="email" label="E-mail" InputProps={{
              readOnly: edit,
            }} defaultValue={currentStudent.email} />
          <TextField sx={{ m: 3 }}
            value={info.user}
            onChange={handleChange}
            id="user" label="User Name" InputProps={{
              readOnly: edit
            }} defaultValue={currentStudent.user} />
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: 'row-reverse',
          mr: 8
        }} >
          <a href="#">Update password</a>
        </Box>
        <Box
          sx={{
            ml: 5,
            mb: 4
          }}
        >
          <Button sx={{ mr: 3 }} size="medium" variant="contained"
            onClick={() => navigate('/student/home')}
          >Back</Button>
          {!edit ? (
            <Button size="medium" variant="contained"
              onClick={handleSave}
            >Save</Button>)
            : (
              <Button sx={{ mr: 3 }} size="medium" variant="contained"
                onClick={() => setEdit(false)}
              >Edit</Button>
            )
          }
        </Box>

      </Paper >
    </Box >
  )
}

export default StudentAccount