import React, { useState, useEffect } from 'react';
import { api_base } from 'config'

function useExams(props) {
  const [exams, setExams] = useState([]);
  
  useEffect(() => {
    const fetchExams = async () => {
      const url = `${api_base}/exams`;
      const res = await fetch(url);
      setExams(await res.json());
    }
    fetchExams();
  }, []);

  if (exams === null) {
    return 'Loading...';
  }
  return exams ? exams : ''
}

export default useExams