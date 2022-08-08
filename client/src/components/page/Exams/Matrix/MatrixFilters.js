import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from '@mui/material/Link';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { pink } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import axios from 'axios';

import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { api_base } from 'config'

const MatrixFilters = () => {
  const {setQuestionsFilterState} = useOutletContext();
  const [categories, setCategories] = useState([]);
  const [rowsState, setRowsState] = useState([]);
	const [trigger, setTrigger] = useState(true);
  let {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getCategories = async () => {
      const examData = await axios.get(`${api_base}/categories/${id}`);
      const examCategories = examData.data.categories;
      setCategories(_prev => examCategories);
      const rows = [];
      let totalCt = 0;
			let totalPoints = 0;
			examCategories.forEach(cat => {
				let localCt = 0;
				let localPoints = 0;
				cat.questions.forEach(ques => {
					if (ques.used) {
						localCt++;
						localPoints += ques.points;
					}
				});
				totalCt += localCt;
				totalPoints += localPoints;
				rows.push({
					id: cat._id,
					name: cat.content,
					questions: cat.questions.length,
					used: localCt,
					counts: '',
					usedPoints: localPoints,
					points: '',
					view: ''
				});
			});
			rows.forEach(r => {
				r.counts = totalCt;
				r.points = totalPoints;
			});
			setRowsState(_prev => rows);
    }
    getCategories();
  }, [trigger]);
  const columns = [
    {field: 'name', headerName: 'Name', flex: 3},
    {field: 'questions', headerName: 'Questions', flex: 1},
    {field: 'used', headerName: 'Used', flex: 1, editable: true},
    {field: 'counts', headerName: 'Counts', flex: 1, renderCell: (rowData) => {
      const quesRow = rowData.row;
        return (
          <Typography sx={{ color: pink[500] }}>
            {quesRow.used} / {quesRow.counts}
          </Typography>
        )
      }
    },
    {field: 'usedPoints', headerName: 'Used Points', flex: 1},
    {field: 'points', headerName: 'Points', flex: 1, renderCell: (rowData) => {
      const quesRow = rowData.row;
        return (
          <Typography sx={{ color: pink[500] }}>
            {quesRow.usedPoints} / {quesRow.points}
          </Typography>
        )
      }
    },
    {field: 'viewQuestions', headerName: 'View Questions', flex: 1, renderCell: (rowData) => {
      const quesRow = rowData.row;
      return <RemoveRedEyeIcon fontSize="large" sx={{ color: pink[500] }}
      onClick={() => {
        setQuestionsFilterState(_prev => {
          return {
            filterModel: {
              items: [
                {
                  columnField: 'category',
                  operatorValue: 'contains',
                  value: quesRow.name
                }
              ],
              linkOperator: "and"
            }
          };
        })
        navigate(`/exams/${id}/questions`)
      }} />
      }}
  ];
  const handleCommit = async(e) => {
    const eValue = Number(e.value)
    for (let i = 0; i < rowsState.length; i++) {
      const r = rowsState[i];
      if (r.id === e.id) {
        if (eValue > r.used && eValue <= r.questions) {
          let ct = eValue - r.used;
					const questionsTrue = [];
					for (const ques of categories[i].questions) {
						if (!ques.used) {
							questionsTrue.push(ques._id);
							ct--;
						}
						if (ct === 0) {
							break;
						}
					}
					questionsTrue.forEach(async ques => await axios.post(`${api_base}/questions/${ques}/used`, {used: true}));
					setTrigger(prev => !prev);
        } else if (eValue < r.used && eValue >= 0) {
					let ct = r.used - eValue;
					const questionsFalse = [];
					for (const ques of categories[i].questions) {
						if (ques.used) {
							questionsFalse.push(ques._id);
							ct--;
						}
						if (ct === 0) {
							break;
						}
					}
					questionsFalse.forEach(async ques => await axios.post(`${api_base}/questions/${ques}/used`, {used: false}));
					setTrigger(prev => !prev);
        } else if (e.value > r.questions || e.value < 0) {
          alert(`Input has to be between 0 and ${r.questions}.`);
          setTrigger(prev => !prev);
        }
      }
    }
  };
  return (
    <div style={{ height: 400, width: '100%' }}>
      {rowsState.length > 0 && <DataGrid onCellEditCommit={handleCommit} columns={columns} rows={rowsState} components={{ Toolbar: GridToolbar }} />}
    </div>
  );
};
export default MatrixFilters;