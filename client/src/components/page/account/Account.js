import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { api_base } from "config";
import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { GlobalContext } from "./GlobalState";
import { v4 as uuid } from "uuid";

export default function Account() {
  const [name, setName] = useState("");
  const { addUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: uuid(),
      name,
    };
    addUser(newUser);
    navigate("/userlist");
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Form className="account" onSubmit={onSubmit}>
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
      <Button type="billing">Billing</Button>
      <Link to="/" className="btn btn-danger ml-2"></Link>
    </Form>
  );
}

// const Account = () => {

//   const navigate = useNavigate();

//   const navigateBilling = () => {

//     navigate('/account/Billing');
//   };

//   return (
//     <div className='account'>Account fdafsafsad
//       <button onClick={navigateBilling}>Billing</button>
//     </div>
//   )
// }

// export default Account
