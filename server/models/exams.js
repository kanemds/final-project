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
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Exams', ExamScheama)