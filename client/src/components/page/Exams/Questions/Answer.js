import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Button, Radio } from "@mui/material";

const Answer = ({setSelected, selected, answerId, handleChange, answer, setAnswers}) => {
  return (
    <>
      <List>
        <ListItem>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Enter Your Choice ({1000 - answer.length} characters remaining)
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
          <Button onClick={() => {
            setAnswers(prev => {
              let newPrev = [];
              prev.forEach((ans, i) => {
                if (i !== answerId) {
                  newPrev.push(ans);
                }
              });
              return newPrev;
            })
            // setDeleted(answerId);
            if (answerId === selected) {
              setSelected("");
            } else if (answerId < selected) {
              setSelected(prev => prev - 1);
            }
          }}>
            <span className="iconify" data-icon="mdi:trash-can-outline" data-width="25"></span>
          </Button>
        </ListItem>
      </List>
    </>
  );
}

export default Answer;