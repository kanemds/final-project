import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import axios from 'axios';

import { api_base } from 'config'

const CategoryEdit = () => {
  const [category, setCategory] = useState({});
  let navigate = useNavigate();
  const {id, categoryId } = useParams();
	useEffect(() => {
    const getCategory = async () => {
      const categoryData = await axios.get(`${api_base}/categories/${categoryId}`);
      setCategory(_prev => categoryData.data);
    }
    getCategory();
  }, []);
  const save = async () => {
    await axios.post(`${api_base}/categories/${categoryId}`, {content: category.content});
    navigate(`/teacher/exams/${id}/categories`);
  };
  return (
    <>
    <h3>Edit Your Category</h3>
      <div style={{display: "flex", flexDirection: "column"}}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Name
			</Typography>
			<TextField value={category.content} 
					onChange={(event) => setCategory(prev => ({...prev, content: event.target.value}))}/>
      <Button component={Link} to={`/teacher/exams/${id}/categories`}>Cancel</Button>
        <Button onClick={async () => await save()}>
          Update
        </Button>
      </div>
	  </>
  )
}

export default CategoryEdit;