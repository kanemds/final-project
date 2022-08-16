import React, { useState, useEffect } from 'react';
import { api_base } from 'config'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function useExam() {
  const [exam, setExam] = useState([]);
  const params = useParams()

  useEffect(() => {
    if (exam.length <= 0 && params.id) {
      getExam(params.id).then((exam) => {
        console.log('????')
        setExam(exam)
      })
    }
  }, [exam, params])

  const getExam = async (examId) => {
    const exam = await axios.get(`${api_base}/exams/${examId}`)
    return exam.data
  }

  const saveExam = async (exam) => {
    // do save exam
  }

  return { exam, setExam, getExam, saveExam }
}

export default useExam