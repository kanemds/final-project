import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Radio } from "@mui/material";

const Answers = ({selected, radioId, handleChange, answer, setAnswer}) => {

  return (
    <>
      <List>
        <ListItem alignItems="center">
          <Radio
            checked={selected === radioId}
            onChange={() => handleChange(radioId)}
            name="radio-buttons"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <TextField
            fullWidth
            value={answer}
            onChange={(event) => {
              setAnswer(radioId, event.target.value)}}
            label="Type your choice here."
          />
        </ListItem>
      </List>
    </>
  );
}

export default Answers;