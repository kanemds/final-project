import React, { useState, useEffect, useContext } from 'react';
import { api_base } from 'config'
import { LoginContext } from 'Contexts/LoginContext';
import axios from 'axios';

function useTeacherCourses() {
  const [courses, setCourses] = useState([]);
  const { teacherId } = useContext(LoginContext)

  const fetchCourses = async () => {
    const url = `${api_base}/course`;
    const res = await fetch(url, {
      credentials: 'include'
    });
    setCourses(await res.json());
  }

  useEffect(() => {
    fetchCourses()
  }, []);

  const addCourse = async (name) => {
    try {
      await axios.post(`${api_base}/course/new`, name, { withCredentials: true })
      console.log('Item successfully added.')
      await fetchCourses()
    } catch (error) {
      console.log(error)
    }
  }

  const removeCourse = async (id) => {
    try {
      await axios.delete(`${api_base}/course/${id}`, { withCredentials: true })
      console.log('Item successfully deleted.')
      await fetchCourses()
    } catch (error) {
      console.log(error)
    }
  }

  const editCourse = async (id, newDoc) => {
    try {
      await axios.post(
        `${api_base}/course/${id}/edit`,
        newDoc,
        { withCredentials: true }
      )
      console.log(newDoc, 'Item successfully edited.')
      await fetchCourses()
    } catch (error) {
      console.log(error)
    }
  }

  if (courses === null) {
    return 'Loading...';
  }

  const data = courses && courses.filter((course) => {
    const exist = course.teachers.find((id) => id === teacherId)
    if (exist) {
      return true
    }
    return false
  })

  return { data, removeCourse, addCourse, editCourse }
}


export default useTeacherCourses