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
<<<<<<< HEAD
      ref: "Exam"
=======
      ref: "Quiz"
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
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