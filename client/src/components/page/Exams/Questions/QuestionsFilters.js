import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Link from '@mui/material/Link';

import { useParams } from 'react-router-dom';
import { api_base } from 'config'
import axios from 'axios';

export default function QuestionsFilters({questions, questionsFilterState, activate}) {
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
      return <Link href={`${api_base}/teacher/exams/${id}/questions/${que.id}/${que.order}`}>{que.question}</Link>
    }},
    {field: 'category', headerName: 'Category', flex: 2.8},
    {field: 'points', headerName: 'Points', flex: 1},
    {field: 'edited', headerName: 'Last Edited', flex: 1.5}
  ];
  const rows = questions.map((ques, i) => {
    return {
      id: ques._id,
      order: i + 1,
      question: ques.content,
      category: ques.category.content,
      points: ques.points,
      edited: new Date(ques.lastEdited).toLocaleDateString('en-US')
    }
  });
  
  return (
    <div style={{ width: '100%' }}>
      {/* <Button
        sx={{ mb: 2 }}
        onClick={() => setCheckboxSelection(!checkboxSelection)}
      >
      </Button> */}
      <div style={{ height: 400 }}>
        <DataGrid
          disableSelectionOnClick
          isRowSelectable={() => !activate}
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