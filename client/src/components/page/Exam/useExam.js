import React, { useState, useEffect } from 'react';
import { api_base } from 'config'

function useExam(props) {
  const [exam, setExam] = useState(null);
  useEffect(() => {
    console.log(api_base)
    const url = `${api_base}/exam/62df934f5a6dd709fa450a53`
    console.log(url)
    // api call
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setExam(data)
      })
      // .catch((err) => console.error("Error: ", err));
  }, []);

  if (exam === null) {
    return 'Loading...';
  }
  return exam ? exam : ''
}

export default useExam