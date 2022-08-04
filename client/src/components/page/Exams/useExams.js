import React, { useState, useEffect } from 'react';
import { api_base } from 'config'
import axios from 'axios';

function useExams(props) {
  const [exams, setExams] = useState([]);

  const fetchExams = async () => {
    const url = `${api_base}/exams`;
    const res = await fetch(url, { credentials: 'include' });
    setExams(await res.json());
  }

  useEffect(() => {

    fetchExams();
  }, []);

  const removeExam = async (id) => {
    try {
      await axios.delete(`${api_base}/exams/${id}`)
      console.log('Item successfully deleted.')
      await fetchExams()
      console.log('update')
    } catch (error) {
      console.log(error)
    }
  }

  if (exams === null) {
    return 'Loading...';
  }
  return { exams, removeExam }
}

export default useExams