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

router.post('/category/:categoryId', async (req, res) => {
  const doc = await Category.findOneAndUpdate(
    {
      _id: req.params.categoryId
    }, 
    { 
      content: req.body.content
    }, {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  )
  res.send(doc);
})

router.post('/category/:categoryId/delete', async (req, res) => {
  const doc = await Category.findOneAndDelete(
    {
      _id: req.params.categoryId
    }
  )
  console.log(doc, 'herere')
  res.send(doc);
})

router.get('/category/:categoryId', async (req, res) => {
  const doc = await Category.findById(req.params.categoryId);
  res.send(doc);
})

router.get('/:id', (req, res) => {
  const doc = Exam.aggregate([
    { $match: { _id: ObjectId(req.params.id) }},
    { $limit: 1 },
    {
      $lookup: {
        from: "categories",
        localField: "categories",
        foreignField: "_id",
        as: "categories"
      }
    }
  ]).exec().then((result) => {
    res.send(result[0]);
  })
})

module.exports = router;