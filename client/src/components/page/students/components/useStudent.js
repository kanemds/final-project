import React, { useState, useEffect } from "react";
import { api_base } from "config";
function useStudent(props) {
  const [student, setStudent] = useState([]);
  console.log(student);
  useEffect(() => {
    const fetchteacher = async () => {
      const url = `${api_base}/student/students/new`;
      const res = await fetch(url);
      setStudent(await res.json());
    };
    fetchteacher();
  }, []);
  if (student === null) {
    return "Loading...";
  }
  return student ? student : "";
}
export default useStudent;
