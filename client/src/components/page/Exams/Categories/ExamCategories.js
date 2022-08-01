import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import BasicModal from './ModalAddCategory';
import Category from './Category';

import { api_base } from 'config'

const ExamCategories = () => {
  const {id} = useParams();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const cats = await axios.get(`${api_base}/categories/${id}`);
      setCategories(_prev => cats.data.categories);
    }
    getCategories();
  }, []);
  return (
    <>
      <BasicModal setCategories={setCategories}/>
      {categories.length > 0 && categories.map((cat, i) => <Category key={i + 1} category={cat} setCategories={setCategories} />)}
    </>
  )
}

export default ExamCategories;