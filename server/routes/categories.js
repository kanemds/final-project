const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const Exam = require('../models/exam')

const ObjectId = require('mongodb').ObjectId;

router.post('/new', async(req, res) => {
  if (req.body.content.length < 0) {
    res.status(400)
    return
  }
  const category = new Category({
    content: req.body.content
  });
  const catDoc = await category.save();
  res.send(catDoc);
})

router.post('/deleteQuestion', async (req, res) => {
  const doc = await Category.findOneAndUpdate(
    { _id: req.body.categoryId }, 
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

router.post('/question/push', async (req, res) => {
  const doc = await Category.findOneAndUpdate(
    {
      _id: req.body.categoryId
    }, 
    { 
      $push: {
        "questions": req.body.questionId
      }
    }, {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  )
  res.send(doc);
})

router.post('/:categoryId', async (req, res) => {
  const doc = await Category.findOneAndUpdate(
    {
      _id: req.params.categoryId
    }, 
    { 
      content: req.body.content,
      lastEdited: Date.now()
    }, {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  )
  res.send(doc);
})

router.post('/:categoryId/delete', async (req, res) => {
  const doc = await Category.findOneAndDelete(
    {
      _id: req.params.categoryId
    }
  )
  res.send(doc);
})

router.get('/:categoryId', async (req, res) => {
  const doc = await Category.findById(req.params.categoryId);
  res.send(doc);
})

router.get('/:categoryId/questions/:questionId', (req, res) => {
  const doc = Category.aggregate([
    { $match: { _id: ObjectId(req.params.categoryId) }},
    { $limit: 1 },
    {
      $lookup: {
        from: "questions",
        localField: "questions",
        foreignField: "_id",
        as: "questions",
        pipeline: [
          { $match: { _id: ObjectId(req.params.questionId) }},
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
    const question = result.map(c => c.questions.map((ques => ({...ques, catId: c._id, catName: c.content})))).flat();
    res.json(question);
  })
})

module.exports = router;