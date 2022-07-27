import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuid } from "uuid";

export default function Students() {
  const [name, setName] = useState("");
  const { Students } = useContext(GlobalContext);
  const history = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: uuid(),
      name,
    };
    Students(newUser);
    history.push("/");
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Form className="students" onSubmit={onSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          value={name}
          onChange={onChange}
          name="name"
          placeholder="Enter user"
          required
        ></Input>
      </FormGroup>
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Form>
  );
}
