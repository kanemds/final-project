import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { GlobalContext } from "../context/GlobalState";
import { EditUser } from "./editstudent";
import { api_base } from "config";
import useStudent from "./useStudent";
import BasicModel from "./ModelAddStudent";

const Student = () => {
  const Students = useStudent();
  return (
    <>
      <h1>Students</h1>
      <BasicModel />
      {Students.map((student) => {
        return <div key={student._id}>{student.name}</div>;
      })}
    </>
  );
};
export default Student;

// export default function Students() {
//   const [name, setName] = useState("");
//   const { addUser } = useContext(GlobalContext);
//   const navigate = useNavigate();

// const onSubmit = (e) => {
//   e.preventDefault();
//   const newUser = {
//     id: uuid(),
//     name,
//   };
//   addUser(newUser);
//   navigate("/userlist");
// };

// const onChange = (e) => {
//   setName(e.target.value);
// };
// const Student = () => {
//   const exams = useStudent();
//   return (
//     <Form className="students" onSubmit={onSubmit}>
//       <FormGroup>
//         <Label>Name</Label>
//         <Input
//           type="text"
//           value={name}
//           onChange={onChange}
//           name="name"
//           placeholder="Enter studemt name"
//           required
//         ></Input>
//       </FormGroup>
//       <Button type="submit">Submit</Button>
//       <Link to="/" className="btn btn-danger ml-2">
//         Cancel
//       </Link>
//     </Form>
//   );
// };
