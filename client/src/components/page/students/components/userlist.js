import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import axios from "axios";
import { api_base } from "config";
import useStudent from "./useStudent";

const Students = () => {
  const student = useStudent();
  return (
    <>
      {student.map((item) => {
        return (
          <div key={student._id}>
            <h1>
              {" "}
              {item.firstname}, {item.lastname}
            </h1>
          </div>
        );
      })}
    </>
  );
};

export const UserList = () => {
  const { removeUser } = useContext(GlobalContext);
  async function getUsers() {
    const response = await axios.get(`${api_base}/students/userlist`);
    console.log(response.data);
    setUsers(response.data);
  }
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ListGroup className="mt-4">
      {users.length > 0 ? (
        <>
          {users.map((user) => (
            <ListGroupItem className="d-flex" key={user.id}>
              <strong>{user.name}</strong>
              <div className="ml-auto">
                <Link
                  to={`/edit/${user.id}`}
                  color="warning"
                  className="btn btn-warning mr-1"
                >
                  Edit
                </Link>
                <Button onClick={() => removeUser(user.id)} color="danger">
                  Delete
                </Button>
              </div>
            </ListGroupItem>
          ))}
        </>
      ) : (
        <h4 className="text-center">No Users</h4>
      )}
    </ListGroup>
  );
};
