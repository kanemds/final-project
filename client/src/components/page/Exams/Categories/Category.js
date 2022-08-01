import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { api_base } from 'config'

const Category = ({category, setCategories}) => {
//   const {id} = useParams();
  return (
    <div>
      {category.content}
    </div>
  )
}

export default Category;