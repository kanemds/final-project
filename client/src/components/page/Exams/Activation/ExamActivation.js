import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import ReactDOM from "react-dom";
import { Container, Draggable } from "react-smooth-dnd";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import axios from 'axios';

import { api_base } from 'config'

const ExamActivation = () => {
  const {id} = useParams();
  const [questions, setQuestions] = useState([]);
	const {activate, setActivate} = useOutletContext();
  useEffect(() => {
    const getQuestions = async () => {
      const questionsData = await axios.get(`${api_base}/questions/exams/${id}/used`);
      setQuestions(_prev => questionsData.data);
    }
    getQuestions();
  }, []);
  const onDrop = ({ removedIndex, addedIndex }) => {
		const removed = questions[removedIndex];
		const newQuestions = [];
		for (let i = 0; i < questions.length; i++) {
			if (i !== removedIndex) {
				let first = removed;
				let second = questions[i];
				if (i === addedIndex) {
					if (removedIndex < addedIndex) {
						first = questions[i];
						second = removed;
					}
					newQuestions.push(first);
				}
				newQuestions.push(second);
			}
  	}
		setQuestions(_prev => newQuestions);
	};
	const onRandom = (questions) => {
		let ct = questions.length;
		let questionsCopy = [...questions];
		const newQuestions = [];
		while (ct > 0) {
			const pos = Math.floor(Math.random() * ct);
			newQuestions.push(questionsCopy[pos]);
			questionsCopy.splice(pos, 1);
			ct--;
		}
		setQuestions(_prev => newQuestions);
	};
  return (
    <List>
			<Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
				{questions.map(({ _id, content }, index) => (
					<Draggable key={_id}>
					<ListItem>
							<ListItemText primary={`${index + 1}) ${content}`} />
							<ListItemSecondaryAction>
							<ListItemIcon className="drag-handle">
									<DragHandleIcon />
							</ListItemIcon>
							</ListItemSecondaryAction>
					</ListItem>
					</Draggable>
				))}
			</Container>
			<Button variant="outlined" onClick={() => onRandom(questions)}>Randomize</Button>
			<FormControlLabel
          value="start"
          control={
					<Switch
						checked={activate}
						onChange={async() => {
							let activated;
							if (activate) {
								activated = false;
								await axios.post(`${api_base}/exams/${id}/activate`, {activate: false});
							} else {
								activated = true;
								await axios.post(`${api_base}/exams/${id}/activate`, {activate: true});
								await axios.post(`${api_base}/exams/${id}/activateQuestionsArray`, {questions});
							}
							setActivate(_prev => activated);
						}
					}
						inputProps={{ 'aria-label': 'controlled' }}
					/>}
          label='Activate'
          labelPlacement="start"
        />
		</List>
  )
}

export default ExamActivation;