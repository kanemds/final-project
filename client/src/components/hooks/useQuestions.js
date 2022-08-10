import React, { useState, useEffect } from 'react';
import { api_base } from 'config'


function useQuestions(props) {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const url = `${api_base}/questions`;
    const res = await fetch(url, { credentials: 'include' });
    setQuestions(await res.json());
  }

  useEffect(() => {

    fetchQuestions();
  }, []);

  if (questions === null) {
    return 'Loading...';
  }
  return questions
}

export default useQuestions