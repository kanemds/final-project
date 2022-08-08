const express = require('express')
const router = express.Router()
const Exam = require('../models/exam')
const Category = require('../models/category')
const Question = require('../models/question')
const Answer = require('../models/answer')

const ObjectId = require('mongodb').ObjectId;

router.get('/', (req, res) => {
  Question.find()
    .then(data => {
      res.send(data);
    }).catch(error => {
      res.json(error);
    });
})

router.post('/new', async (req, res) => {
  if (req.body.answers.length < 0) {
    res.status(400)
    return
  }

  const question = new Question({
    content: req.body.content,
    points: req.body.points,
    answers: req.body.answers,
    correctAnswer: req.body.correctAnswer,
    category: req.body.category,
    used: req.body.used
  })
  const questionDoc = await question.save();
  res.send(questionDoc);
})

router.post('/delete', async (req, res) => {
  const doc = await Question.findOneAndDelete(
    {
      _id: req.body.questionId
    }
  );
  res.send(doc);
})

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

module.exports = router