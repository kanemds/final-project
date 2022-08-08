const express = require('express')
const router = express.Router()
const Exam = require('../models/exam')
const Category = require('../models/category')
const Question = require('../models/question')
const Answer = require('../models/answer')

const ObjectId = require('mongodb').ObjectId;

router.get('/', (req, res) => {
  Questioins.find()
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

// router.get('/exams/:id', (req, res) => {
//   const doc = Exam.aggregate([
//     { $match: { _id: ObjectId(req.params.id) }},
//     { $limit: 1 },
//     {
//       $lookup: {
//         from: "categories",
//         localField: "categories",
//         foreignField: "_id",
//         as: "categories",
//         pipeline: [
//           {
//             $lookup: {
//               from: "questions",
//               localField: "questions",
//               foreignField: "_id",
//               as: "questions",
//               pipeline: [
//                 {
//                   $lookup: {
//                     from: "answers",
//                     localField: "answers",
//                     foreignField: "_id",
//                     as: "answers"
//                   }
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     }
//   ]).exec().then((result) => {
//     const questions = result[0].categories.map(c => c.questions.map((ques => ({...ques, catId: c._id, catName: c.content})))).flat();
//     // console.log(questions, 'questions#######')
//     res.json(questions);
//   })
// })

router.get('/exams/:id', async (req, res) => {
  const questionsData = await Exam.aggregate([
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
  ]);
  const questions = [];
  for (const ques of questionsData[0].questions) {
    const catId = ques.category;
    questions.push({...ques, category: await Category.findById(catId)});
  }
  res.send(questions);
})

router.get('/:categoryId/:questionId', (req, res) => {
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

router.get('/exams/:examId/used', (req, res) => {
  const doc = Exam.aggregate([
    { $match: { _id: ObjectId(req.params.examId) }},
    { $limit: 1 },
    {
      $lookup: {
        from: "questions",
        localField: "questions",
        foreignField: "_id",
        as: "questions",
        pipeline: [
          { $match: { used: true }}
        ]
      }
    }
  ]).exec().then((result) => {
    const question = result.map(c => c.questions.map((ques => ({...ques, catId: c._id, catName: c.content})))).flat();
    res.json(question);
  })
})

module.exports = router