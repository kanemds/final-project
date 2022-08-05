import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useExams from '../Exams/useExams'
import useTeacherCourses from './useTeacherCourses'
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';


const AddExamsToCourse = () => {
  const [selected, setSelected] = useState()
  const { id } = useParams()
  const { data, editCourse } = useTeacherCourses()
  const { exams } = useExams()
  console.log(exams)
  const selectedHandle = (e) => {
    const id = e.target.value
    const toggle = selected && selected[id] ? false : true
    setSelected({
      ...selected,
      [id]: toggle
    })
  }

  const currentCourse = data.find(item => item._id === id)

  const otherExams = exams.length > 0 && exams.filter((item) => {
    if (!currentCourse) {
      return false
    }
    const currentExamIds = currentCourse.exams
    console.log(currentExamIds)
    return !currentExamIds.includes(item._id.toString())
  })

  const takingExams = exams && exams.filter((item) => {
    if (!currentCourse) {
      return false
    }
    const currentExamIds = currentCourse.exams
    return currentExamIds.includes(item._id.toString())
  })

  const handleEdit = () => {
    let selectedExamIds = []
    for (const id in selected) {
      if (selected[id]) {
        selectedExamIds.push(id)
      }
    }
    editCourse(id, { exams: selectedExamIds })
  }

  useEffect(() => {
    if (!selected && takingExams.length > 0) {
      const newSelected = {}
      for (const exam of takingExams) {
        newSelected[exam._id] = true
      }
      setSelected(newSelected)
    }
  }, [exams, selected, takingExams])

  if (!currentCourse || !data) {
    return ""
  }

  return (
    <>
      <h1>Exams</h1>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>

            <ListItem disablePadding>
              <ListItemText primary="Current Courses" />
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          {takingExams && takingExams.map((item) => {
            const isSelected = selected && selected[item._id] === true ? 'checked' : ''
            return (
              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary={item.name} />
                    <Checkbox value={item._id} checked={isSelected} onChange={selectedHandle} />
                  </ListItemButton>
                </ListItem>
              </List>
            )
          })}
        </nav>
        <Divider />
        <h2>Total Exams: {currentCourse.exams.length}</h2>
      </Box>


      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>

            <ListItem disablePadding>
              <ListItemText primary="Available Exams" />
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          {otherExams && otherExams.map((item) => {
            const isSelected = selected && selected[item._id] === true ? 'checked' : ''
            console.log(selected)
            return (
              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary={item.name} />
                    <Checkbox value={item._id} checked={isSelected} onChange={selectedHandle} />
                  </ListItemButton>
                </ListItem>
              </List>
            )
          })}
        </nav>
        <Divider />
        <h2>Total Exams: {otherExams.length}</h2>
      </Box>
      <Button add={selected} onClick={handleEdit}>Edit Exams</Button>
    </>
  )
}

export default AddExamsToCourse