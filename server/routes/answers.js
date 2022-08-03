const express = require('express')
const router = express.Router()
const Exam = require('../models/exam')
const Question = require('../models/question')
const Answer = require('../models/answer')

router.post('/new', (req, res) => {
  const answer = new Answer ({
    content: req.body.content
  })
  answer.save()
    .then(data => {      
      res.json(data)
    })
    .catch(error => {
      res.json(error)
    })
})

router.post('/delete', async (req, res) => {
  const doc = await Answer.findOneAndDelete(
    {
      _id: req.body.answerId
    }
  );
  res.send(doc);
})

router.get('/', (req, res) => {
  Exam.find()
  .then(data => {
    res.send(data);
  }).catch(error => {
    res.json(error);
  });
})

module.exports = router