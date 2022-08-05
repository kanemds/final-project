import React, { useState, useEffect } from 'react'
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { pink } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { api_base } from 'config'

const Category = ({category, setCategories}) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const categoryData = await axios.get(`${api_base}/categories/category/${category._id}`);
      setQuestions(_prev => categoryData.data.questions);
    }
    getQuestions();
  }, []);
  const remove = async () => {
    if (questions.length > 0) {
      alert('move questions to another category');
      return;
    }
    setCategories(prev => {
      const newPrev = [];
      for (const cat of prev) {
        if (cat._id !== category._id) {
          newPrev.push(cat);
        }
      }
      return newPrev;
    });
    await axios.post(`${api_base}/categories/category/${category._id}/delete`);
    navigate(`/exams/${id}/categories`);
  };
  return (
    <Card
    sx={{
      minWidth: 50,
      margin: 1,
      "&:hover": {
        boxShadow: "0 2px 5px 1px",
        cursor: "pointer"
      }

    }}
   >
    <CardContent >
      <Typography sx={{ fontSize: 24 }} gutterBottom>
        {category.content}
      </Typography>
      <Typography sx={{ fontSize: 20 }} gutterBottom>
        Questions: {questions.length}
      </Typography>
      {category.content !== 'No Category Assigned' && 
      <>
        <BorderColorIcon fontSize="large" sx={{ color: blue[500] }}
          onClick={() => navigate(`/exams/${id}/categories/${category._id}/edit`)} />
        <HighlightOffIcon fontSize="large" sx={{ color: pink[500] }}
          onClick={async () => await remove()} />
      </>
      }
    </CardContent>
    <CardActions>
    </CardActions>
  </Card>
  )
}

export default Category;