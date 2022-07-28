const express = require('express')
const router = express.Router()
const Exams = require('../models/exams')
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

module.exports = router