const { request } = require("express");
const express = require("express");
const Student = require("../models/extra/student");
const router = express.Router();

const ObjectId = require("mongodb").ObjectId;

router.post("/new", (req, res) => {
  const student = new Student({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    user: req.body.user,
    exam: req.body.exam,
    teachers: req.body.teachers,
  });
  student
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/:id/edit", (req, res) => {
  student
    .findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          student: req.body.firstname,
          student: req.body.lastname,
          student: req.body.email,
        },
      },
      {
        new: true,
        upsert: true,
      }
    )
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/students/new", (req, res) => {
  Student.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});
router.get("/:id", (req, res) => {
  const doc = Student.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "Exam",
        localField: "Exam",
        foreignField: "_id",
        as: "Exam",
        pipeline: [],
      },
      $lookup: {
        from: "Teacher",
        localField: "Teacher",
        foreignField: "_id",
        as: "Teacher",
        pipeline: [],
      },
    },
  ])
    .exec()
    .then((result) => {
      res.json(result[0]);
    });
});
module.exports = router;

// const { request } = require("express");
// const express = require("express");
// const student = require("../models/extra/student");
// const router = express.Router();
// const students = require("../models/extra/student");

// const ObjectId = require("mongodb").ObjectId;

// router.post("/new", (req, res) => {
//   console.log("request", req.body);
//   const student = new students({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     exam: req.body.exam,
//     teachers: req.body.teachers,
//   });
//   student
//     .save()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

// router.get("/userlist", (req, res) => {
//   student
//     .find()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

// router.get("/:id", (req, res) => {
//   const doc = students
//     .aggregate([
//       { $match: { _id: ObjectId(req.params.id) } },
//       { $limit: 1 },
//       {
//         $lookup: {
//           from: "Exam",
//           localField: "Exam",
//           foreignField: "_id",
//           as: "Exam",
//           pipeline: [],
//         },
//         $lookup: {
//           from: "Teacher",
//           localField: "Teacher",
//           foreignField: "_id",
//           as: "Teacher",
//           pipeline: [],
//         },
//       },
//     ])
//     .exec()
//     .then((result) => {
//       res.json(result[0]);
//     });
// });

// module.exports = router;
