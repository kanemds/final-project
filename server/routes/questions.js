const express = require("express");
const router = express.Router();
const Question = require("../models/question");
<<<<<<< HEAD
=======


>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9

router.get('/', (req, res) => {
  Question.find()
    .then(data => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

<<<<<<< HEAD
router.post("/new", async (req, res) => {
=======
router.post("/new", (req, res) => {
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
  if (req.body.answers.length < 0) {
    res.status(400);
    return;
  }
  const question = new Question({
    content: req.body.content,
    points: req.body.points,
    answers: req.body.answers,
    correctAnswer: req.body.correctAnswer,
    category: req.body.category,
    used: req.body.used
  })
<<<<<<< HEAD
  const questionDoc = await question.save();
  res.send(questionDoc);
})
=======
  question.save()
    .then(q => res.json(q))
    .catch(e => res.json(e))
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9

router.post('/delete', async (req, res) => {
  const doc = await Question.findOneAndDelete(
    {
      _id: req.body.questionId
    }
  );
  res.send(doc);
})

<<<<<<< HEAD
router.post('/:questionId/used', async (req, res) => {
  const doc = await Question.findOneAndUpdate(
    {
      _id: req.params.questionId
    },
    {
      used: req.body.used
    },
    {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  );
  res.send(doc);
})

router.post('/:questionId/edit', async (req, res) => {
  const doc = await Question.findOneAndUpdate(
    {
      _id: req.params.questionId
    },
    {
      content: req.body.content,
      points: req.body.points,
      answers: req.body.answers,
      correctAnswer: req.body.correctAnswer,
      category: req.body.category,
      used: req.body.used
    },
    {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  );
  res.send(doc);
})
=======

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
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9

module.exports = router;
