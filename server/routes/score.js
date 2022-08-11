const express = require("express");
const Exam = require("../models/exam")
const router = express.Router();
const Score = require("../models/score")

const ObjectId = require("mongodb").ObjectId;

<<<<<<< HEAD
router.post("/new", (req, res) => {
  Score.find({
    student: req.body.student,
    exam: req.body.exam
  }).exec().then((existing) => {
    if (Array.isArray && existing.length < 20) {
=======
const canWriteExam = async (studentId, examId, scoreId) => {
  let currentExamId = examId
  if (!examId && scoreId) {
    const score = Score.findById({ _id: scoreId })
    currentExamId = score.exam
  }
  const exam = Exam.findById({ _id: currentExamId })
  const {
    attemptsLimit,
    timeLimit
  } = exam
  let doExam = true
  const existingScores = await Score.find({
    student: studentId,
    exam: examId
  }).exec()

  if (Array.isArray && attemptsLimit && existingScores.length >= attemptsLimit) {
    doExam = false
  }

  if (existingScores && existingScores[0] && new Date().getTime() > new Date(new Date(existingScores[0].created).getTime() + timeLimit * 60 * 1000).getTime()) {
    doExam = false
  }

  return doExam
}

router.post("/new", (req, res) => {
  canWriteExam(req.body.student, req.body.exam).then(async (canWriteExam) => {
    if (canWriteExam) {
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
      const score = new Score({
        score: req.body.score,
        answers: req.body.answers,
        student: req.body.student,
        exam: req.body.exam,
        submitted: false,
      });
<<<<<<< HEAD
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

=======
      const savedScore = await score
        .save()
        .catch((error) => {
          res.json(error);
        });

      res.json(savedScore)
    } else {
      res.json({})
    }
  }).catch((error) => {
    res.json(error);
  });
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
});


router.post('/:id/edit', (req, res) => {
<<<<<<< HEAD
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
=======
  const studentId = req.session.user
  canWriteExam(studentId, null, req.params.id).then(async (canWriteExam) => {
    if (!canWriteExam) {
      res.json({})
      return
    }

    const newDoc = req.body
    const { answers } = newDoc
    for (let prop in newDoc) {
      if (!newDoc[prop]) {
        delete newDoc[prop];
        //it will remove fields who are undefined or null 
      }
    }
    const data = await Score.findOneAndUpdate(
      {

        _id: req.params.id

      },
      newDoc,
      {
        // return doc after update is applied
        new: true,
        upsert: true
      }
    ).exec()

>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
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
<<<<<<< HEAD
      console.log({ answer, correctAnswers })
=======
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
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
<<<<<<< HEAD
    return scoreDoc
  }).then((finalScore) => {
    res.json(finalScore)
  })
    .catch((err) => console.log(err))
=======

    res.json(scoreDoc)
  }).catch((err) => {
    res.json(err)
  })
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
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
