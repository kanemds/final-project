
import React, { useState, useEffect } from 'react';
import { api_base } from 'config'
import { ConstructionOutlined } from '@mui/icons-material';

function useTeacher(props) {
  const [teacher, setTeacher] = useState([]);
  useEffect(() => {
    const fetchteacher = async () => {
      const url = `${api_base}/teacher`;
      const res = await fetch(url);
      setTeacher(await res.json());
    }
    fetchteacher();
  }, []);

  if (teacher === null) {
    return 'Loading...';
  }
  return teacher ? teacher : ''
}

export default useTeacher