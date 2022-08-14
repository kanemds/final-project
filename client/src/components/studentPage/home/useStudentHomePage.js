
import React, { useState, useEffect } from 'react';
import { api_base } from 'config'


function useStudentHomePage(props) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchstudents = async () => {
      const url = `${api_base}/student`;
      const res = await fetch(url, {
        credentials: 'include'
      });
      setStudents(await res.json());
    }
    fetchstudents();
  }, []);

  if (students === null) {
    return 'Loading...';
  }
  return students ? students : ''
}

export default useStudentHomePage