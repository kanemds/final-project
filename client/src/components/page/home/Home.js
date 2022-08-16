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
            position: "absolute",
            marginLeft: 50,
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
        marginTop={15}
        marginLeft={55}
        height={700}
        width={850}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"absolute"}
        zIndex={2}
      >
        <div>
          <Typography
            variant="h4"
            component="h4"
            sx={{
              color: "white",
              bgcolor: "black",
              opacity: 0.6,
              borderColor: "black",
              marginTop: 13,
              fontSize: 35,
              marginLeft: 10,
            }}
          >
            The most powerful tool to deliver exams
          </Typography>
          <div>
            <Typography sx={{ fontSize: 25, marginLeft: 10 }}>
              Click the apply now button to start your journey
            </Typography>
          </div>
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
              bgcolor: "gray",
              opacity: 0.9,
              border: 1,
              width: "100%",
              height: "35vh",
            }}
          >
            <div className="banner-text">
              <h1></h1>

              <Button
                variant="contained"
                href="/"
                style={{
                  position: "absolute",
                  right: 950,
                  top: 350,
                  fontSize: "large",
                  opacity: 1,
                  backgroundColor: "darkblue",
                }}
              >
                Apply Now
              </Button>

              <Button
                variant="contained"
                onClick={handleOpen}
                style={{
                  position: "absolute",
                  right: 970,
                  top: 400,
                  fontSize: "Large",
                  backgroundColor: "darkblue",
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
          {/* <Grid container>
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
          </Grid> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
