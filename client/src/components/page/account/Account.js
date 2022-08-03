import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalState";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { api_base } from "config";
import { shadows } from "@mui/system";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicModal from "./ModalAddAccount";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import useAccount from "./useAccount";

const Accounts = () => {
  const { removeUser } = useContext(GlobalContext);
  const { editUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const account = useAccount();
  const BoxShadowDiv = styled("div")(
    ({ theme }) => `
margin: ${theme.spacing(2)};
padding: ${theme.spacing(2)};
border: 1px solid black;
box-shadow: ${theme.shadows[12]};`
  );

  return (
    <>
      <h1>Add Accounts</h1>
      <BasicModal />

      {account.map((item) => (
        <Card
          key={item._id}
          sx={{
            minWidth: 50,
            margin: 1,
            "&:hover": {
              boxShadow: "0 2px 5px 1px",
              cursor: "pointer",
            },
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 24 }} gutterBottom>
              <Link
                to={`/teacher/account/${item._id}/`}
                key={item._id}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {item.firstname} {item.lastname} {item.email}
              </Link>
            </Typography>
            <Button
              onClick={() => navigate("/teacher/account/edit", { state: item })}
              sx={{ fontSize: 20 }}
              gutterBottom
            >
              Edit
            </Button>
            <Button
              onClick={() => removeUser(item._id)}
              sx={{ fontSize: 20 }}
              gutterBottom
            >
              Delete
            </Button>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      ))}
    </>
  );
};

export default Accounts;
