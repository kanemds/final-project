import React, { useState, useEffect } from 'react';
import { api_base } from 'config'

function useHome(props) {
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const url = `${api_base}/teacher`;
      const res = await fetch(url);
      setTeacher(await res.json());
    }
    fetchExams();
  }, []);

  if (teacher === null) {
    return 'Loading...';
  }
  return teacher ? teacher : ''
}

export default useHome