const mongoose = require('mongoose')

const CourseScheama = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    }
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ],
  exams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam"
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Course', CourseScheama)