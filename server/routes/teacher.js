const express = require("express");
const student = require("../models/extra/student");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const Teacher = require("../models/teacher");

router.post("/new", (req, res) => {
  const teacher = new Teacher({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  });
  teacher
    .save()
    .then((data) => res.json(data))
    .catch((error) => {
      res.json(error);
    });
});
// this route is working
router.put("/student/:id", (req, res) => {
  student
    .updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    )
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
// route working well
router.delete("/teacher/student/:id", (req, res) => {
  student
    .findOneAndDelete({
      _id: req.params.id,
    })
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.post("/:id/edit", (req, res) => {
  Teacher.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: {
        teacher: req.body.teacher,
      },
    },
    {
      // return doc after update is applied
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

router.get("/:id", (req, res) => {
  const doc = Teacher.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "exams",
        localField: "exams",
        foreignField: "_id",
        as: "exams",
        pipeline: [
          {
            $lookup: {
              from: "students",
              localField: "students",
              foreignField: "_id",
              as: "students",
            },
          },
        ],
      },
    },
  ])
    .exec()
    .then((result) => {
      // console.log(result);
      res.json(result[0]);
    });
});

router.get("/", (req, res) => {
  Teacher.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/:teacherId/reports/records", (req, res) => {
  const doc = Teacher.aggregate([
    { $match: { _id: ObjectId(req.params.teacherId) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "exams",
        localField: "exams",
        foreignField: "_id",
        as: "exams",
        pipeline: [
          {
            $lookup: {
              from: "scores",
              localField: "scores",
              foreignField: "_id",
              as: "scores",
            },
          },
        ],
      },
    },
  ])
    .exec()
    .then((result) => {
      // console.log(result);
      res.json(result[0]);
    });
});

// router.put("/courses/:id", (req, res) => {
//   student
//     .updateOne({
//       _id: req.params.id,
//     })
//     .exec()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => console.log(err));
// });

module.exports = router;
