import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserList } from "./userlist";
import { api_base } from "config";
import { Email } from "@mui/icons-material";
import useAccount from "./useAccount";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();
  return (
    <div>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          First Name{" "}
          <textarea
            value={firstname}
            onChange={(event) => setFirstName((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Last Name{" "}
          <textarea
            value={lastname}
            onChange={(event) => setLastName((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Email{" "}
          <textarea
            value={email}
            onChange={(event) => setEmail((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          User{" "}
          <textarea
            value={user}
            onChange={(event) => setUser((_prev) => event.target.value)}
            rows="1"
            cols="30"
          ></textarea>
        </Typography>
        <Button
          onClick={() =>
            axios
              .post(`${api_base}/account/new`, {
                firstname,
                lastname,
                email,
              })
              .then((response) => {
                navigate(`/teacher/account`);
              })
          }
        >
          Add Account
        </Button>
        <Button> Password Reset</Button>
      </Box>
    </div>
  );
}
