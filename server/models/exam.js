const mongoose = require('mongoose')

const ExamScheama = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  attempt: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  passScore: {
    type: Number
  },
  instructions: {
    type: String
  },
  passFeedback: {
    type: String
  },
  failFeedback: {
    type: String
  },
  activate: {
    type: Boolean,
    default: false
  },
  activateQuestionsArray: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Exams', ExamScheama)