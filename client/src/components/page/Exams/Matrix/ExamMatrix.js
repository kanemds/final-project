import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { api_base } from 'config';
import MatrixFilters from './MatrixFilters';

const ExamMatrix = () => {
  return (
    <>
      <MatrixFilters />
    </>
  )
};

export default ExamMatrix;