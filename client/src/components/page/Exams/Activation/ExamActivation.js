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
	const { id } = useParams();
	const [questions, setQuestions] = useState([]);
	const { activate, setActivate } = useOutletContext();
	useEffect(() => {
		const getQuestions = async () => {
			const questionsData = await axios.get(`${api_base}/exams/${id}/questions/used`);
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
		<>
			<div style={{ display: 'flex' }}>
				<Button variant="contained" onClick={() => onRandom(questions)} disabled={activate}>Randomize</Button>
				<FormControlLabel
					value="start"
					control={
						<Switch
							checked={activate}
							onChange={async () => {
								let activated;
								if (activate) {
									await axios.post(`${api_base}/exams/${id}/deactivate`);
									activated = false;
								} else {
									await axios.post(`${api_base}/exams/${id}/activate`, { questions });
									activated = true;
								}
								setActivate(_prev => activated);
							}
							}
							inputProps={{ 'aria-label': 'controlled' }}
						/>}
					label='Activate'
					labelPlacement="start"
				/>
			</div>
			<br />
			<List>
				<Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
					{questions.map(({ _id, content }, index) => (
						<Draggable key={_id}>
							<ListItem>
								<ListItemText primary={`${index + 1}) ${content}`} />
								{
									!activate &&
									<ListItemSecondaryAction>
										<ListItemIcon className="drag-handle">
											<DragHandleIcon />
										</ListItemIcon>
									</ListItemSecondaryAction>
								}
							</ListItem>
						</Draggable>
					))}
				</Container>
			</List>
		</>
	)
}

export default ExamActivation;
