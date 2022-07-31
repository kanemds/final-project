import React, { useState, useEffect } from "react";
import { api_base } from "config";

function useStudent(props) {
  const [Student, setStudent] = useState([]);
  useEffect(() => {
    const fetchStudent = async () => {
      const url = `${api_base}/students`;
      const res = await fetch(url);
      setStudent(await res.json());
    };
    fetchStudent();
  }, []);

  if (Student === null) {
    return "Loading...";
  }
  return Student ? Student : "";
}
export default useStudent;
