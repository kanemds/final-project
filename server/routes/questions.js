const express = require('express')
const router = express.Router()
const Exams = require('../models/exams')
const Question = require('../models/question')
const Answer = require('../models/answer')

router.post('/new', (req, res) => {
  console.log(req.body)

  if (req.body.answers.length < 0) {
    res.status(500)
    return
  }

  const question = new Question({
    content: req.body.content,
    answers: req.body.answers,
    correctAnswer: req.body.correctAnswer
  })

  question.save()
    .then(data => {      
      res.json(data)
    })
    .catch(error => {
      res.json(error)
    })
})

module.exports = router