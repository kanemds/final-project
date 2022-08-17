import React, { useState, useEffect, useContext } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

import { api_base } from 'config'
import { LoginContext } from 'Contexts/LoginContext';

const Qustions = () => {
  const [rows, setRows] = useState([]);
  const { courseId, examId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getRows = async () => {
      const examData = await axios.get(`${api_base}/exams/${examId}/reports`);
      const scoresData = await axios.get(`${api_base}/score/courses/${courseId}/exams/${examId}`);
			const originalOrder = (questionId) => {
				const questions = examData.data.questions;
				for (let i = 0; i < questions.length; i++) {
					if (questionId === questions[i]) {
						return i + 1;
					}
				}
			};
			const rowsData = examData.data.questionsUsed.map(ques => {
				return {
					id: ques._id,
					question: ques.content,
					correctAns: ques.correctAnswer,
					rightAttempts: 0,
					wrongAttempts: 0,
					originalOrder: originalOrder(ques._id)
				}
			});
			scoresData.data.forEach(score => {
				score.answers.forEach((ans, i) => {
					if (ans === rowsData[i].correctAns) {
						rowsData[i].rightAttempts++;
					} else {
						rowsData[i].wrongAttempts++;
					}
				});
			});
			setRows(_prev => rowsData);
    }
    getRows();
  }, []);
  const columns = 
  [
    {field: 'question', headerName: 'Question', flex: 3},
    {field: 'rightAttempts', headerName: 'Right Attempts', flex: 1},
    {field: 'wrongAttempts', headerName: 'Wrong Attempts', flex: 1},
    {field: 'view', headerName: 'View Question', flex: 1, renderCell: (rowData) => {
      const quesRow = rowData.row;
      return (
        <IconButton aria-label="View" onClick={() => {
          navigate(`/teacher/exams/${examId}/questions/${quesRow.id}/${quesRow.originalOrder}`)
        }}>
          <RemoveRedEyeIcon />
      </IconButton>
      )}},
  ];
  return (
    <Box style={{ height: 400, width: '100%' }}>
      {rows.length > 0 && <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />}
    </Box>
  )
}

export default Qustions;