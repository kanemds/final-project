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

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Img = styled("img")({
    margin: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <React.Fragment>
      <Login open={open} handleClose={handleClose} />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            position: "fixed",
            marginRight: 0,
            marginBottom: 0,
            marginTop: 0,
            height: 200,
            width: 200,
            flexDirection: "row-reverse",
            bgcolor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        noValidate
        autoComplete="off"
        mr={0}
        mb={0}
        marginTop={10}
        height={700}
        width={900}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"absolute"}
        zIndex={1}
      >
        <div>
          <Typography
            variant="h4"
            component="h4"
            color={"black"}
            bgcolor={"white"}
            border={5}
            borderColor={"black"}
            marginTop={10}
            fontSize={30}
          >
            Examinator is the perfect tool for instructors to deliver
            examinations to their students at any education level and at
            anytime. State of the art customized exams, classes and courses with
            the click of a button!
          </Typography>
          ;
        </div>
      </Box>

      <div className="homgpage" style={{ position: "relative", width: "100%" }}>
        <div
          className="home-img-container"
          style={{
            display: "block",
            padding: "0vh 0vw",
          }}
        >
          <div
            className="homeimage"
            style={{
              display: "flex",
              backgroundImage: `url(${logo})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              palette: {
                primary: "f5f5f5",
              },
              border: 1,
              borderColor: "white",
              width: "100%",
              height: "35vh",
              backgroundPosition: "center",
            }}
          >
            <div className="banner-text">
              <h1></h1>

              <Button
                variant="contained"
                href="/"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 180,
                }}
              >
                Apply Now
              </Button>

              <Button
                variant="contained"
                onClick={handleOpen}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 130,
                }}
              >
                Log in
              </Button>
            </div>
          </div>
        </div>

        <div
          className="home-buttons"
          style={{
            padding: "0vh",
            paddingLeft: 900,
            // justifyContent: "right",
          }}
        >
          <Grid container>
            <Grid item>
              <ButtonBase
                sx={{
                  width: 800,
                  height: 800,
                  paddingBottom: 30,
                  paddingLeft: 10,
                }}
              >
                <Img src={bottom} />
              </ButtonBase>
            </Grid>

            <div></div>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
