import React from 'react'
import axios from 'axios'
import { api_base } from 'config'
import { useNavigate , useParams } from 'react-router-dom'
import useExam from '../useExam'


const SaveButton = ( { question, answers, correctAnswerIndex}) => {
    const param = useParams()
    const navigate = useNavigate()
    const examId = param.id
    let answerIds = []
    let questionId = null
    const handleSave = () => {

      const saveAnswers = async () => {        
        for (const content of answers) {
          const rest = await axios.post(`${api_base}/answers/new`, {
            content
          })
          answerIds.spush(rest.data._id)
        }        
      }

      // save answers
      saveAnswers()
        .then((res) => {
          answerIds = res.map((item) => item.data._id)
          return axios.post(`${api_base}/questions/new`, {
              content: question,
              answers: answerIds,
              correctAnswer: answerIds[correctAnswerIndex]
            })        
        }).then(() => {
          // done
          return axios.post(`${api_base}/exams/${examId}/edit`, {
            questions: questionId
          })
        }).then(() => {
          navigate(`/exams/${examId}/questions`)
        }).catch((err) => {
          throw err
        })
    }

    return (
      <>
        <button onClick={handleSave}>
          Save
        </button>
      </>
    )

}
export default SaveButton