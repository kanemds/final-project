import React, { useContext, useEffect, useState } from "react";
import useStudent from "./useStudent";
import { GlobalContext } from "../context/GlobalState";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { api_base } from "config";
import { shadows } from "@mui/system";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicModal from "./ModelAddStudent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Students = () => {
  const { removeUser } = useContext(GlobalContext);
  const { editUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const student = useStudent();
  const BoxShadowDiv = styled("div")(
    ({ theme }) => `
margin: ${theme.spacing(2)};
padding: ${theme.spacing(2)};
border: 1px solid black;
box-shadow: ${theme.shadows[12]};`
  );

  return (
    <>
      <h1>Add Students</h1>
      <BasicModal />

      {student.map((item) => (
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
                to={`/teacher/students/${item._id}/`}
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
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}></Box>
            <Button
              onClick={() =>
                navigate("/teacher/students/edit", { state: item })
              }
              sx={{ fontSize: 20 }}
              gutterBottom
            >
              Edit Student Account
            </Button>
            <Button
              onClick={() => removeUser(item._id)}
              sx={{ fontSize: 20 }}
              gutterBottom
            >
              Delete
            </Button>

            <Divider variant="middle" />
            <Box sx={{ m: 2 }}></Box>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="{course.name}" />
            </ListItemButton>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Students;

//   return (
//     <>
//       {student.map((item) => {
//         return (
// <div key={student._id}>
//   <h1>
// {" "}
// {item.firstname}, {item.lastname}, {item.email}
//   </h1>
// </div>
//         );
//       })}
//     </>
//   );
// };

// export default Students;

// export const UserList = () => {
//   const { removeUser } = useContext(GlobalContext);
//   async function getUsers() {
//     const response = await axios.get(`${api_base}/students/userlist`);
//     console.log(response.data);
//     setUsers(response.data);
//   }
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     getUsers();
//   }, []);

//   return (
//     <ListGroup className="mt-4">
//       {users.length > 0 ? (
//         <>
//           {users.map((user) => (
//             <ListGroupItem className="d-flex" key={user.id}>
//               <strong>{user.name}</strong>
//               <div className="ml-auto">
//                 <Link
//                   to={`/edit/${user.id}`}
//                   color="warning"
//                   className="btn btn-warning mr-1"
//                 >
//                   Edit
//                 </Link>
//                 <Button onClick={() => removeUser(user.id)} color="danger">
//                   Delete
//                 </Button>
//               </div>
//             </ListGroupItem>
//           ))}
//         </>
//       ) : (
//         <h4 className="text-center">No Users</h4>
//       )}
//     </ListGroup>
//   );
// };
