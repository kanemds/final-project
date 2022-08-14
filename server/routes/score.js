const express = require("express");
const Exam = require("../models/exam")
const router = express.Router();
const Score = require("../models/score")
const Question = require("../models/question")
const ObjectId = require("mongodb").ObjectId;

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
      const score = new Score({
        score: req.body.score,
        totalScore: 0,
        answers: req.body.answers,
        student: req.body.student,
        course: req.body.course,
        exam: req.body.exam,
        submitted: false,
      });
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

});


router.post('/:id/edit', (req, res) => {

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

    const correctAnswers = {}
    let totalScore = 0
    exam[0].questions.forEach((question) => {
      console.log(question)
      if (question.correctAnswer) {
        correctAnswers[question.correctAnswer.toString()] = question.points
        totalScore += question.points
      }
    })

    let score = 0

    for (const answerId of answers) {
      if (correctAnswers && correctAnswers[answerId]) {
        console.log(answerId)
        score += correctAnswers[answerId]
      }
    }

    const scoreDoc = await Score.findOneAndUpdate({
      _id: req.params.id
    },
      { score, totalScore },
      {
        // return doc after update is applied
        new: true,
        upsert: true
      }).exec()


    res.json(scoreDoc)
  }).catch((err) => {
    res.json(err)
  })

})

router.get("/:id", (req, res) => {
  const doc = Score.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "course",
        localField: "course",
        foreignField: "_id",
        as: "course",
      }
    },
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

router.get("/courses/:courseId/exams/:examId", async (req, res) => {
  const doc = await Score.find(
    {
    course: req.params.courseId,
    exam: req.params.examId
    }
  );
  res.send(doc);
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
