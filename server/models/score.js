const mongoose = require('mongoose')

const ScoreScheama = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer"
  }],
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },
  submitted: {
    type: mongoose.Schema.Types.Boolean,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Score', ScoreScheama)