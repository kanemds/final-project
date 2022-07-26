const express = require('express')
const router = express.Router()
const Exam = require('../models/exam')
const Question = require('../models/question')
const Answer = require('../models/answer')

const ObjectId = require('mongodb').ObjectId;

router.post('/new', (req, res) => {
  console.log(req.body)
  const exam = new Exam ({
    name: req.body.name,
    questions: req.body.questions
  })
  exam.save()
    .then(data => {      
      res.json(data)
    })
    .catch(error => {
      res.json(error)
    })
  }
)

router.get('/:id', (req, res) => {
  console.log(req.params)
  const doc = Exam.aggregate([
    { $match: { _id: ObjectId(req.params.id) }},
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
              as: "answers"
            }
          }
        ]
      }
    }
  ]).exec().then((result) => {
    console.log(result)
    res.json(result[0])
  })
})

module.exports = router