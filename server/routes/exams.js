const express = require("express");
const router = express.Router();
const Exams = require("../models/exams");
const Question = require("../models/question");
const Answer = require("../models/answer");
const student = require("../models/extra/student");

const ObjectId = require("mongodb").ObjectId;

router.post("/new", (req, res) => {
  const exam = new Exams({
    name: req.body.name,
  });
  exam
    .save()
    .then((data) => res.json(data))
    .catch((error) => {
      res.json(error);
    });
});

router.post("/:id/edit", (req, res) => {
  Exams.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: {
        questions: req.body.questions,
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
  const doc = Exams.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "questions",
        localField: "questions",
        foreignField: "_id",
        as: "questions",
        pipeline: [
          {
            $lookup: {
              from: "answers",
              localField: "answers",
              foreignField: "_id",
              as: "answers",
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

router.get('/', (req, res) => {
  Exams.find()
    .then(data => {
      res.send(data);
    }).catch(error => {
      res.json(error);
    });
})

router.get("/students/id", (req, res) => {
  student
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
