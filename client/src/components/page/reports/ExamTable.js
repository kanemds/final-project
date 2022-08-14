import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ExamTable = ({table}) => {
  return (
    <Box p={5}>
      <Paper>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Total Attempts</TableCell>
              <TableCell align="center">Highest Score</TableCell>
              <TableCell align="center">Lowest Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={table.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{table.attempts}</TableCell>
              <TableCell align="center">{table.highest}</TableCell>
              <TableCell align="center">{table.lowest}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  )
}
export default ExamTable;