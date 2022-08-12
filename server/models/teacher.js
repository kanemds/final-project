const mongoose = require('mongoose')


const TeacherSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  exams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam"
    }
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ],
  data: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Teacher', TeacherSchema)