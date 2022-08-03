const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const Course = require("../models/course");

router.post("/new", (req, res) => {
  const course = new Course({
    name: req.body.name,
  });
  course
    .save()
    .then((data) => res.json(data))
    .catch((error) => {
      res.json(error);
    });
});

router.post("/:id/edit", (req, res) => {
  Course.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: {
        course: req.body.course,
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
  const doc = Course.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "teachers",
        localField: "teachers",
        foreignField: "_id",
        as: "teachers",
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
        pipeline: [
          {
            $lookup: {
              from: "exams",
              localField: "exams",
              foreignField: "_id",
              as: "exams",
            },
          },
        ],
      },
    },
  ])
    .exec()
    .then((result) => {
      console.log(result);
      res.json(result[0]);
    });
});

router.get("/", (req, res) => {
  Course.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
