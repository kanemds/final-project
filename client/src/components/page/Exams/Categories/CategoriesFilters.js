import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { pink } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import axios from 'axios';

import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { api_base } from 'config'

export default function CategoriesFilters({categories, setCategories}) {
  const {setQuestionsFilterState} = useOutletContext();
  let {id} = useParams();
  const navigate = useNavigate();
  const remove = async (catRow) => {
    console.log(catRow, 'catRowhererererere')
    if (Number(catRow.questions) > 0) {
      alert('move questions to another category');
      return;
    }
    setCategories(prev => {
      const newPrev = [];
      for (const cat of prev) {
        if (cat._id !== catRow.id) {
          newPrev.push(cat);
        }
      }
      return newPrev;
    });
    await axios.post(`${api_base}/categories/${catRow.id}/delete`);
    navigate(`/exams/${id}/categories`);
  };
  const columns = [
    {field: 'name', headerName: 'Name', flex: 3},
    {field: 'questions', headerName: 'Questions', flex: 1},
    {field: 'used', headerName: 'Using', flex: 1},
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
    {field: 'edit', headerName: 'Edit', flex: 1, renderCell: (rowData) => {
      const catRow = rowData.row;
      if (catRow.name !== 'No Category Assigned') {
        return <BorderColorIcon fontSize="large" sx={{ color: blue[500] }} 
        onClick={() => navigate(`/exams/${id}/categories/${rowData.row.id}/edit`)} />}
      }
    },
    {field: 'delete', headerName: 'Delete', flex: 1, renderCell: (rowData) => {
      const catRow = rowData.row;
      if (catRow.name !== 'No Category Assigned') {
        return <HighlightOffIcon fontSize="large" sx={{ color: pink[500] }}
        onClick={async () => await remove(catRow)} />}
      }
    },
    {field: 'created', headerName: 'Created', flex: 2.5}
  ];
  const rows = categories.map(cat => {
    const used = (questions) => {
      let res = 0;
      questions.forEach(ques => {
        if (ques.used) {
          res++;
        }
      });
      return res;
    };
    return {
      id: cat._id,
      name: cat.content,
      questions: cat.questions.length,
      used: used(cat.questions),
      view: '',
      edit: '',
      delete: '',
      created: cat.created
    }
  });
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
    </div>
  );
}