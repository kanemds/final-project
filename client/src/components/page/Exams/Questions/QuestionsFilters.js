import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

// const VISIBLE_FIELDS = ['order', 'quesiton', 'category', 'points', 'created'];
import { useParams } from 'react-router-dom';
import { api_base } from 'config'
import axios from 'axios';

export default function QuestionsFilters({questions, questionsFilterState}) {
  let {id} = useParams();
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [selectionModel, setSelectionModel] = useState(() => {
    return questions.filter((ques) => ques.used).map((ques) => ques._id);
  }
);
  const columns = [
    {field: 'order', headerName: 'Order', flex: 1},
    {field: 'question', headerName: 'Question', flex: 5, renderCell: (rowData) => {
      const que = rowData.row;
      return <Link href={`${api_base}/exams/${id}/questions/${que.id}/${que.order}`}>{que.question}</Link>
    }},
    {field: 'category', headerName: 'Category', flex: 3},
    {field: 'points', headerName: 'Points', flex: 1},
    {field: 'created', headerName: 'Created', flex: 4}
  ];
  const rows = questions.map((ques, i) => {
    return {
      id: ques._id,
      order: i + 1,
      question: ques.content,
      category: ques.category.content,
      points: ques.points,
      created: ques.created
    }
  });
  
  return (
    <div style={{ width: '100%' }}>
      <Button
        sx={{ mb: 2 }}
        onClick={() => setCheckboxSelection(!checkboxSelection)}
      >
        Use In Exam
      </Button>
      <div style={{ height: 400 }}>
        <DataGrid
          checkboxSelection={checkboxSelection}
          selectionModel={selectionModel}
          onSelectionModelChange={async (ids) => {            
            const prevSelectedIDs = {};
            selectionModel.forEach(id => prevSelectedIDs[id] = true);
            let isChange = false;
            for (const id of ids) {
              if (prevSelectedIDs[id]) {
                delete prevSelectedIDs[id];
              } else {
                isChange = true;
                await axios.post(`${api_base}/questions/${id}/used`, {used: true});
              }
            }
            const arr = Object.keys(prevSelectedIDs);
            if (arr.length > 0) {
              isChange = true;
              await axios.post(`${api_base}/questions/${arr[0]}/used`, {used: false});
            }
            if (isChange) {
              setSelectionModel(ids);
            }            
          }}
          columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} 
          initialState={{filter: questionsFilterState}}
        />
      </div>
    </div>
  );
}