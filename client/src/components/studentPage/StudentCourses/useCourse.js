import React, { useState, useEffect, useContext } from 'react';
import { api_base } from 'config'
import { LoginContext } from 'Contexts/LoginContext';

function useCourses(props) {
  const [courses, setCourses] = useState([]);
  const { userId } = useContext(LoginContext)

  useEffect(() => {
    const fetchCourses = async () => {
      const url = `${api_base}/course`;
      const res = await fetch(url, {
        credentials: 'include'
      });
      setCourses(await res.json());
    }
    fetchCourses();

  }, []);

  if (courses === null) {
    return 'Loading...';
  }

  const data = courses && courses.filter((course) => {
    console.log(course.students)
    const exist = course.students.find((id) => id === userId)

    if (exist) {
      return true
    }
    return false
  })

  return data
}

export default useCourses