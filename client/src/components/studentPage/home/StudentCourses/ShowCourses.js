import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ShowCourses = (props) => {
  const { courses } = props;

  return (
    courses &&
    courses.length > 0 && (
      <>
        {courses.map((course) => (
          <Card
            key={course._id}
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
                <div
                  key={course.name}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Course: {course.name}
                </div>
              </Typography>
              <Typography sx={{ fontSize: 20 }} gutterBottom>
                Exams: {course.exams.length}
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        ))}
      </>
    )
  );
};

export default ShowCourses;
