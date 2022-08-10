const express = require("express");
const Exam = require("../models/exam")
const router = express.Router();
const Score = require("../models/score")

const ObjectId = require("mongodb").ObjectId;

router.post("/new", (req, res) => {
  Score.find({
    student: req.body.student,
    exam: req.body.exam
  }).exec().then((existing) => {
    if (Array.isArray && existing.length < 20) {
      const score = new Score({
        score: req.body.score,
        answers: req.body.answers,
        student: req.body.student,
        exam: req.body.exam,
        submitted: false,
      });
      return score
        .save()
        .then((data) => res.json(data))
        .catch((error) => {
          res.json(error);
        });
    } else {
      res.json({})
    }
  })

});


router.post('/:id/edit', (req, res) => {
  const newDoc = req.body
  const { answers } = newDoc
  for (let prop in newDoc) {
    if (!newDoc[prop]) {
      delete newDoc[prop];
      //it will remove fields who are undefined or null 

    }
  }
  Score.findOneAndUpdate(
    {

      _id: req.params.id

    },
    newDoc,
    {
      // return doc after update is applied
      new: true,

      upsert: true
    }
  ).exec().then(async (data) => {
    const examId = data.exam
    const exam = await Exam.aggregate([
      { $match: { _id: ObjectId(examId) } },
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
                from: "answer",
                localField: "answers",
                foreignField: "_id",
                as: "answers",
              },
            },
          ],
        },
      },
    ]).exec()

    const correctAnswers = exam && exam[0].questions.map((question) => {
      return question.correctAnswer && question.correctAnswer.toString()
    })

    let score = 0
    for (const answer of answers) {
      console.log({ answer, correctAnswers })
      if (correctAnswers && correctAnswers.includes(answer)) {
        score += 1
      }
    }

    const scoreDoc = await Score.findOneAndUpdate({
      _id: req.params.id
    },
      { score },
      {
        // return doc after update is applied
        new: true,
        upsert: true
      }).exec()
    return scoreDoc
  }).then((finalScore) => {
    res.json(finalScore)
  })
    .catch((err) => console.log(err))
})

router.get("/:id", (req, res) => {
  const doc = Score.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "student",
        localField: "student",
        foreignField: "_id",
        as: "student",
        pipeline: [
          {
            $lookup: {
              from: "exam",
              localField: "exam",
              foreignField: "_id",
              as: "exam",
            },
          },
        ],
      },
    },
  ])
    .exec()
    .then((result) => {
      console.log(result);
      res.json(result[0]);
    });
});

router.get('/', (req, res) => {
  const user = req.session.user
  let findQuery = null

  if (user) {
    findQuery = {
      student: user
    }
  }


  Score.find(findQuery).sort({
    created: -1
  })
    .then(data => {
      res.send(data);
    }).catch(error => {
      res.json(error);
    });
})



router.delete('/:id', (req, res) => {
  Score.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return res.json({ err: "Score not found" })
    }
    return res.status(202).send()
  })
})


module.exports = router;
