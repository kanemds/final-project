const express = require('express')
const router = express.Router()
const Exam = require('../models/exam')
const Category = require('../models/category')
const Question = require('../models/question')
const Answer = require('../models/answer')

const ObjectId = require('mongodb').ObjectId;

router.post('/new', async (req, res) => {
  const examNew = new Exam({
    name: req.body.name
  });
  const exam = await examNew.save();
  const categoryNew = new Category({
    content: 'No Category Assigned'
  });
  const category = await categoryNew.save();
  const examDoc = await Exam.findOneAndUpdate(
    {
      _id: exam._id
    },
    {
      $push: {
        "categories": category._id
      }
    },
    {
      new: true,
      upsert: true
    }
  )
  res.send(examDoc);
  }
)

router.post('/:id/categories/push', (req, res) => {
  Exam.findOneAndUpdate(
    {
      _id: req.params.id
    }, 
    { 
      $push: {
        "categories": req.body.category
      }
    }, {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  ).exec().then((data) => {
    res.json(data)
  }).catch((err) => console.log(err))  
})

router.post('/:id/question/push', (req, res) => {
  Exam.findOneAndUpdate(
    {
      _id: req.params.id
    }, 
    { 
      $push: {
        "questions": req.body.question
      }
    }, {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  ).exec().then((data) => {
    res.json(data)
  }).catch((err) => console.log(err))  
})

router.post('/:id/deleteQuestion', async (req, res) => {
  const doc = await Category.findOneAndUpdate(
    { _id: req.params.id }, 
    {
      $pull: { questions: req.body.questionId }
    },
    {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  );
  res.send(doc);
})

router.post('/:id/properties', (req, res) => {
  Exam.findOneAndUpdate(
    {
      _id: req.params.id
    }, 
    { 
      name: req.body.name,
      passScore: req.body.passScore,
      instructions: req.body.instructions,
      passFeedback: req.body.passFeedback,
      failFeedback: req.body.failFeedback
    }, {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  ).exec().then((data) => {
    res.json(data)
  }).catch((err) => console.log(err))  
})

router.post('/:id/activate', (req, res) => {
  Exam.findOneAndUpdate(
    {
      _id: req.params.id
    }, 
    { 
      activate: req.body.activate
    }, {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  ).exec().then((data) => {
    res.json(data)
  }).catch((err) => console.log(err))  
})

router.post('/:id/activateQuestionsArray', (req, res) => {
  Exam.findOneAndUpdate(
    {
      _id: req.params.id
    }, 
    { 
      activateQuestionsArray: req.body.questions
    }, {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  ).exec().then((data) => {
    res.json(data)
  }).catch((err) => console.log(err))  
})

router.get('/', (req, res) => {
  Exam.find()
  .then(data => {
    res.send(data);
  }).catch(error => {
    res.json(error);
  });
})

router.get('/:id', (req, res) => {
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
    res.json(result[0])
  })
})

module.exports = router