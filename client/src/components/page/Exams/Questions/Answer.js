import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Button, Radio } from "@mui/material";

const Answer = ({setSelected, setDeleted, selected, answerId, handleChange, answer, setAnswer}) => {

  return (
    <>
      <List>
        <ListItem alignItems="center">
          <Button onClick={() => {
            setDeleted(prev => ({...prev, [answerId]: true}));
            if (answerId === selected) {
              setSelected("");
            }
          }}>
            <span className="iconify" data-icon="mdi:trash-can-outline" data-width="25"></span>
          </Button>
          <Radio
            checked={selected === answerId}
            onChange={() => handleChange(answerId)}
            name="radio-buttons"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <TextField
            fullWidth
            value={answer}
            onChange={(event) => {
              setAnswer(answerId, event.target.value)}}
            label="Type your choice here."
          />
        </ListItem>
      </List>
    </>
  );
}

export default Answer;