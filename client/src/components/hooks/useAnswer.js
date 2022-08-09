import React, { useState, useEffect } from 'react';
import { api_base } from 'config'


function useAnswers(props) {
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    const url = `${api_base}/answers`;
    const res = await fetch(url, { credentials: 'include' });
    setAnswers(await res.json());
  }

  useEffect(() => {
    fetchAnswers();
  }, []);

  if (answers === null) {
    return 'Loading...';
  }
  return answers
}

export default useAnswers