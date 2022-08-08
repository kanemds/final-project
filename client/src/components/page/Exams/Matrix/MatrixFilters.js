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
  let {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getCategories = async () => {
      const examData = await axios.get(`${api_base}/categories/${id}`);
      const exam = examData.data.categories;
      setCategories(_prev => exam);
      let ct = 0;
      const rows = [];
      exam.forEach(cat => {
        let localCt = 0;
        cat.questions.forEach(ques => {
          if (ques.used) {
            localCt++;
          }
        });
        ct += localCt;
        rows.push({
          id: cat._id,
          name: cat.content,
          questions: cat.questions.length,
          used: localCt,
          matrix: '',
          view: '',
          add: '',
          remove: ''
        });
      });
      rows.forEach(r => (r.matrix = ct));
      setRowsState(_prev => rows);
    }
    getCategories();
  }, []);
  const columns = [
    {field: 'name', headerName: 'Name', flex: 3},
    {field: 'questions', headerName: 'Questions', flex: 1},
    {field: 'used', headerName: 'Using', flex: 1},
    {field: 'matrix', headerName: 'Matrix', flex: 1, renderCell: (rowData) => {
      const quesRow = rowData.row;
        return (
          <Typography sx={{ color: pink[500] }}>
            {quesRow.used} / {quesRow.matrix}
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
      }},
    {field: 'add', headerName: 'Add', type:"number", flex: 1, editable: true},
    {field: 'remove', headerName: 'Remove', type:"number", flex: 1, editable: true}
  ];
  const handleCommit = async(e) => {
    const rows = [];
    for (let i = 0; i < rowsState.length; i++) {
      const r = rowsState[i];
      const maxAdd = r.matrix - r.used;
      if (r.id === e.id) {
        if (e.field === 'add') {
          if (e.value <= maxAdd && e.value >= 0) {
            rows.push({...r, [e.field]: e.value});
            let ct = e.value;
            for (const ques of categories[i].questions) {
              if (!ques.used) {
                await axios.post(`${api_base}/questions/${ques._id}/used`, {used: true});
                ct--;
              }
              if (ct === 0) {
                break;
              }
            }
          } else {
            alert(`${maxAdd} not being used. Input has to be between 0 and ${maxAdd}.`);
            rows.push({...r});
          }
        } else {
          if (e.value <= r.used && e.value >= 0) {
            rows.push({...r, [e.field]: e.value});
            let ct = e.value;
            for (const ques of categories[i].questions) {
              if (ques.used) {
                await axios.post(`${api_base}/questions/${ques._id}/used`, {used: false});
                ct--;
              }
              if (ct === 0) {
                break;
              }
            }
          } else {
            alert(`${r.used} being used. Input has to be between 0 and ${r.used}.`);
            rows.push({...r});
          }
        }
      } else {
        rows.push({...r});
      }
    }
    setRowsState(_prev => rows);
};
  return (
    <div style={{ height: 400, width: '100%' }}>
      {rowsState.length > 0 && <DataGrid onCellEditCommit={handleCommit} columns={columns} rows={rowsState} components={{ Toolbar: GridToolbar }} />}
    </div>
  );
};
export default MatrixFilters;