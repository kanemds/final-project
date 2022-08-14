const express = require("express");
const router = express.Router();
const Exam = require("../models/exam");
const Category = require('../models/category')
const Question = require("../models/question");
const Answer = require("../models/answer");
const student = require("../models/extra/student");

const ObjectId = require("mongodb").ObjectId;

router.get("/", (req, res) => {
  Exam.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get('/:id', (req, res) => {
  const doc = Exam.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
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
});

router.get('/:id/reports', (req, res) => {
  const doc = Exam.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "questions",
        localField: "activateQuestionsArray",
        foreignField: "_id",
        as: "questionsUsed",
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
});

router.get('/:id/properties', async (req, res) => {
  const doc = await Exam.findById(req.params.id);
  res.send(doc);
});

router.get('/:id/questions', async (req, res) => {
  const questionsData = await Exam.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
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
    questions.push({ ...ques, category: await Category.findById(catId) });
  }
  res.send(questions);
});

router.get('/:id/categories', (req, res) => {
  const doc = Exam.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "categories",
        localField: "categories",
        foreignField: "_id",
        as: "categories",
        pipeline: [
          {
            $lookup: {
              from: "questions",
              localField: "questions",
              foreignField: "_id",
              as: "questions"
            }
          }
        ]
      }
    }
  ]).exec().then((result) => {
    res.send(result[0]);
  })
});

router.get('/:examId/questions/used', (req, res) => {
  const doc = Exam.aggregate([
    { $match: { _id: ObjectId(req.params.examId) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "questions",
        localField: "questions",
        foreignField: "_id",
        as: "questions",
        pipeline: [
          { $match: { used: true } }
        ]
      }
    }
  ]).exec().then((result) => {
    const question = result.map(c => c.questions.map((ques => ({ ...ques, catId: c._id, catName: c.content })))).flat();
    res.json(question);
  })
});

router.get("/students/id", (req, res) => {
  student
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/new", async (req, res) => {
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
});

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
});

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
  const doc = await Exam.findOneAndUpdate(
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
});

router.post('/:id/properties', (req, res) => {
  console.log(req.body, 'req.body, hereere')
  Exam.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      name: req.body.name,
      passScore: req.body.passScore,
      timeLimit: req.body.timeLimit,
      attemptsLimit: req.body.attemptsLimit,
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
});

router.post('/:id/activate', (req, res) => {
  Exam.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      activate: true,
      activateQuestionsArray: req.body.questions
    }, {
    // return doc after update is applied
    new: true,
    upsert: true
  }
  ).exec().then((data) => {
    res.json(data)
  }).catch((err) => console.log(err))
});

router.post('/:id/deactivate', (req, res) => {
  Exam.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      activate: false,
      // activateQuestionsArray: []
    }, {
    // return doc after update is applied
    new: true,
    upsert: true
  }
  ).exec().then((data) => {
    res.json(data)
  }).catch((err) => console.log(err))
});

router.delete("/:id", (req, res) => {
  Exam.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return res.json({ err: "Exam not found" });
    }
    return res.status(202).send();
  });
});

module.exports = router;