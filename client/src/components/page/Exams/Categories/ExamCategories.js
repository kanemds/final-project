import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import BasicModal from './ModalAddCategory';
import CategoriesFilters from './CategoriesFilters';
import EmptyCategory from '../img/EmptyCategory.jpg';
import { api_base } from 'config'

const ExamCategories = () => {
  const {id} = useParams();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const cats = await axios.get(`${api_base}/exams/${id}/categories`);
      setCategories(_prev => cats.data.categories);
    }
    getCategories();
  }, []);
  return (
    <>
      <BasicModal setCategories={setCategories}/>
      {categories.length > 0 && <CategoriesFilters categories={categories} setCategories={setCategories} />}
    </>
  )
}

export default ExamCategories;