const mongoose = require('mongoose')

const ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  attemptsLimit: {
    type: Number
  },
  timeLimit: {
    type: Number
  },
  passScore: {
    type: Number,
    default: 50
  },
  instructions: {
    type: String,
    default: ''
  },
  passFeedback: {
    type: String,
    default: 'Unfortunately, you did not pass.'
  },
  failFeedback: {
    type: String,
    default: 'Congratulations! You passed!'
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


module.exports = mongoose.model('Exam', ExamSchema)

