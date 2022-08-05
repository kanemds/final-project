import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Link from '@mui/material/Link';

// const VISIBLE_FIELDS = ['order', 'quesiton', 'category', 'points', 'created'];
import { useParams } from 'react-router-dom';
import { api_base } from 'config'

export default function QuesitonsFilters({questions}) {
  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100,
  // });
  let {id} = useParams();
  const columns = [
    {field: 'order', headerName: 'Order', flex: 1}, // flex
    {field: 'quesiton', headerName: 'Quesiton', flex: 5, renderCell: (rowData) => {
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
    </div>
  );
}