import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useTeacherCourses from './useTeacherCourses'
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { LoginContext } from 'Contexts/LoginContext';

const AddStudentsToCourse = () => {
  const [selected, setSelected] = useState()
  const { id } = useParams()
  const { students } = useContext(LoginContext)
  const { data, editCourse } = useTeacherCourses()
  console.log(data)
  const selectedHandle = (e) => {
    const id = e.target.value
    const toggle = selected && selected[id] ? false : true
    setSelected({
      ...selected,
      [id]: toggle
    })
  }

  const currentCourse = data.find(item => item._id === id)

  const otherStudents = students.length > 0 && students.filter((item) => {
    if (!currentCourse) {
      return false
    }
    const currentStudentIds = currentCourse.students
    return !currentStudentIds.includes(item._id)
  })

  const currentStudents = students && students.filter((item) => {
    if (!currentCourse) {
      return false
    }
    const currentStudentIds = currentCourse.students
    return currentStudentIds.includes(item._id)
  })

  const handleEdit = () => {
    let selectedStudentIds = []
    for (const id in selected) {
      if (selected[id]) {
        selectedStudentIds.push(id)
      }
    }
    editCourse(id, { students: selectedStudentIds })
  }

  useEffect(() => {
    if (!selected && currentStudents.length > 0) {
      const newSelected = {}
      for (const student of currentStudents) {
        newSelected[student._id] = true
      }
      setSelected(newSelected)
    }
  }, [students, selected, currentStudents])

  if (!currentStudents || !data) {
    return ""
  }

  return (
    <>
      <h1>Students</h1>
      <br />
      <div className='checkedBox'>
        <div className='checkedBox box single'>
          <h2 className='header'>Current Students</h2>
          <div>
            <nav className='body'>
              {currentStudents && currentStudents.map((item) => {
                const isSelected = selected && selected[item._id] === true ? 'checked' : ''
                return (
                  <List sx={{
                    pt: 1,
                    pb: 0,
                    mr: 1,
                    ml: 1
                  }}>
                    <ListItem disablePadding >
                      <ListItemButton component="a" href="#simple-list">
                        <ListItemText className='list' primary={`${item.firstname} ${item.lastname}`} />
                        <Checkbox value={item._id} checked={isSelected} onChange={selectedHandle} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                )
              })}
            </nav>
          </div>
          <h2 className='footer'>Total Students: {currentStudents.length}</h2>
        </div>

        <div className='checkedBox button'>
          <Button
            sx={{

              p: 0,
              '&:hover': {
                background: 'none'
              }
            }}
            add={selected} onClick={handleEdit}><SyncAltIcon
              sx={{

                fontSize: "80px"
              }} ></SyncAltIcon></Button>
        </div>

        <div className='checkedBox box single'>
          <h2 className='header'>Other Students</h2>
          <div>
            <nav className='body'>
              {otherStudents && otherStudents.map((item) => {
                const isSelected = selected && selected[item._id] === true ? 'checked' : ''
                return (
                  <List sx={{
                    pt: 1,
                    pb: 0,
                    mr: 1,
                    ml: 1
                  }}>
                    <ListItem disablePadding >
                      <ListItemButton component="a" href="#simple-list">
                        <ListItemText className='list' primary={`${item.firstname} ${item.lastname}`} />
                        <Checkbox value={item._id} checked={isSelected} onChange={selectedHandle} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                )
              })}
            </nav>
          </div>
          <h2 className='footer'>Total Students: {otherStudents.length}</h2>
        </div>
      </div>
    </>
  )
}

export default AddStudentsToCourse