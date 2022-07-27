const express = require("express");
const router = express.Router();
const students = require("../models/extra/student");

const ObjectId = require("mongodb").ObjectId;

router.post("/new", (req, res) => {
  console.log(req.body);
  const student = new student({
    name: req.body.name,
    name: req.body.name,
  });
  student
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  const doc = students
    .aggregate([
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
      console.log(result);
      res.json(result[0]);
    });
});

module.exports = router;
