import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useExams from '../Exams/useExams'
import useTeacherCourses from './useTeacherCourses'
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { fontSize, padding } from '@mui/system';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const AddExamsToCourse = () => {
  const [selected, setSelected] = useState()
  const { id } = useParams()
  const { data, editCourse } = useTeacherCourses()
  const { exams } = useExams()
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
      <br />
      <div className='checkedBox'>
        <div className='checkedBox box single'>
          <h2 className='header'>Current Exams</h2>
          <div>
            <nav className='body'>
              {takingExams && takingExams.map((item) => {
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
                        <ListItemText className='list' primary={item.name} />
                        <Checkbox value={item._id} checked={isSelected} onChange={selectedHandle} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                )
              })}
            </nav>
          </div>
          <h2 className='footer'>Total Exams: {currentCourse.exams.length}</h2>
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
          <h2 className='header'>Available Exams</h2>
          <div>
            <nav className='body'>
              {otherExams && otherExams.map((item) => {
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
                        <ListItemText className='list' primary={item.name} />
                        <Checkbox value={item._id} checked={isSelected} onChange={selectedHandle} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                )
              })}
            </nav>
          </div>
          <h2 className='footer'>Total Exams: {otherExams.length}</h2>
        </div>
      </div>
    </>
  )
}

export default AddExamsToCourse