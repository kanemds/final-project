import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import { red } from '@mui/material/colors';
import { Radio } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Answer = ({setSelected, selected, answerId, handleChange, answer, answers, setAnswers, checkedAllAbove, setCheckedAllAbove}) => {
  return (
    <List sx={{ flexGrow: 1 }}>
      <ListItem>
        <Typography id="modal-modal-description">
        <AcUnitRoundedIcon sx={{ color: red[500] }}/> Enter Your Choice ({1000 - answer.length} characters remaining)
        </Typography>
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          value={answer}
          onChange={(event) => {
            setAnswers(prev => {
              const newPrev = [...prev];
              newPrev[answerId] = event.target.value;
              return newPrev;
            })}}
        />
        <Radio
          checked={selected === answerId}
          onChange={() => handleChange(answerId)}
          name="radio-buttons"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <IconButton onClick={() => {
          if (checkedAllAbove && answerId === answers.length - 1) {
            setCheckedAllAbove(_prev => false);
          }
          setAnswers(prev => {
            let newPrev = [];
            prev.forEach((ans, i) => {
              if (i !== answerId) {
                newPrev.push(ans);
              }
            });
            return newPrev;
          })
          if (answerId === selected) {
            setSelected("");
          } else if (answerId < selected) {
            setSelected(prev => prev - 1);
          }
        }}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </List>
  );
}

export default Answer;