const express = require("express");
const router = express.Router();
const Exams = require("../models/exams");
const Question = require("../models/question");
const Answer = require("../models/answer");

router.get("/", (req, res) => {
  Questioins.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/new", (req, res) => {
  if (req.body.answers.length < 0) {
    res.status(400);
    return;
  }

  const question = new Question({
    content: req.body.content,
    answers: req.body.answers,
    correctAnswer: req.body.correctAnswer,
  });
  question
    .save()
    .then((q) => res.json(q))
    .catch((e) => res.json(e));
});

// router.post('/addanswers', (req, res) => {
//   let exam = await Exams.findOneAndUpdate(req.body.examId,
//     {answers: req.body.ansArr, correctAnswer: req.body.corAns});
//   exam.save()
//     .then(data =>
//       res.json(data))
//     .catch(error => {
//       res.json(error)
//     })
//   }
// )

module.exports = router;
