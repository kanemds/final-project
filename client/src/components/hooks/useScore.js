import React, { useState, useEffect, useContext } from 'react';
import { api_base } from 'config'
import axios from 'axios';
import { LoginContext } from 'Contexts/LoginContext';

function useScore() {
  const [scores, setScores] = useState([]);
  const { userId } = useContext(LoginContext)

  const fetchScores = async () => {
    const url = `${api_base}/score`;
    const res = await fetch(url, { credentials: 'include' });

    setScores(await res.json());
  }

  useEffect(() => {
    fetchScores();
  }, []);

  const newScore = async (doc) => {
    try {
      const newDoc = await axios.post(`${api_base}/score/new`, doc, { withCredentials: true })
      console.log('Item successfully added.')
      await fetchScores()
      return newDoc
    } catch (error) {
      console.log(error)
    }
  }

  const editScore = async (id, newDoc) => {
    try {
      await axios.post(
        `${api_base}/score/${id}/edit`,
        newDoc,
        { withCredentials: true }
      )
      console.log(newDoc, 'Item successfully edited.')
      await fetchScores()
    } catch (error) {
      console.log(error)
    }
  }


  if (scores === null || !userId) {
    return 'Loading...';
  }

  const getAllScoreByExamId = (examId) => {
    return scores && scores.filter((score) => score.exam === examId)
  }

  const getScoreByExamId = (examId) => {
    return scores && scores.find((score) => score.exam === examId)
  }

  const getScoreByScoreId = (scoreId) => {
    return scores && scores.find((score) => score._id === scoreId)
  }

  return { newScore, editScore, scores, getScoreByExamId, getAllScoreByExamId, getScoreByScoreId }
}

export default useScore