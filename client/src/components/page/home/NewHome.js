import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import home from "./home.jpg";
import { TextField, Box } from "@mui/material";
import bottom from "./bottom.jpeg";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Login from "./Login";
import logo from "./logo.png";

import "./Home.css";
import { display, flexbox, positions } from "@mui/system";
import { black } from "@mui/material/colors";
import { DonutLarge } from "@mui/icons-material";

const NewHome = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <React.Fragment>
      <div className="homecontainer">
        <div
          className="homeimage"
          style={{
            backgroundImage: `url(${logo})`,
            width: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "40vh",
          }}
        >
        </div>


        <Login open={open} handleClose={handleClose} />

        <Typography
          sx={{
            mt: 6,
            mb: 4
          }}
          variant="h4" component="h2">
          The most powerful tool to deliver exams
        </Typography>
        <Typography variant="h6" component="h2">
          Click the apply now button to start your journey
        </Typography>
        {/* </Box> */}

        <Box sx={{ mt: 4 }}>
          <Button sx={{ mr: 4 }} variant="contained">
            Apply Now
          </Button>

          <Button
            variant="contained"
            onClick={handleOpen}>
            Log in
          </Button>
        </Box>
      </div>

    </React.Fragment >
  );
};

export default NewHome;
