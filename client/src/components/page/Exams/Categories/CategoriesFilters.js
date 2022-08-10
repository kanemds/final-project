import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { pink } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';
import { api_base } from 'config'

export default function CategoriesFilters({categories, setCategories, setQuestionsFilterState, activate}) {
  let {id} = useParams();
  const navigate = useNavigate();
  const remove = async (catRow) => {
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
    navigate(`/teacher/exams/${id}/categories`);
  };
  const columns = [
    {field: 'name', headerName: 'Name', flex: 3},
    {field: 'questions', headerName: 'Questions', flex: 1},
    {field: 'used', headerName: 'Using', flex: 1},
    {field: 'viewQuestions', headerName: 'View Questions', flex: 1, renderCell: (rowData) => {
      const quesRow = rowData.row;
      return (
        <IconButton aria-label="View" onClick={() => {
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
          navigate(`/teacher/exams/${id}/questions`)
        }} disabled={activate}>
          <RemoveRedEyeIcon />
      </IconButton>
      )}
    },
    {field: 'edit', headerName: 'Edit', flex: 1, renderCell: (rowData) => {
      const catRow = rowData.row;
      if (catRow.name !== 'No Category Assigned') {
        return (
          <IconButton aria-label="Edit" onClick={() => navigate(`/teacher/exams/${id}/categories/${rowData.row.id}/edit`)} disabled={activate}>
            <EditIcon />
          </IconButton>
        )}
      }
    },
    {field: 'delete', headerName: 'Delete', flex: 1, renderCell: (rowData) => {
      const catRow = rowData.row;
      if (catRow.name !== 'No Category Assigned') {
        return (
          <IconButton aria-label="delete" onClick={async () => await remove(catRow)} disabled={activate}>
            <DeleteIcon />
          </IconButton>
        )}
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