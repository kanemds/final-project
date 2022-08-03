const mongoose = require('mongoose')
const slugify = require('slugify')

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
  exams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
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
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
})

TeacherSchema.pre('validate', function () {
  const name = this.firstname + this.lastname
  if (name) {
    this.slug = slugify(name, {
      lower: true,
      strict: true
    })
  }
})

module.exports = mongoose.model('Teacher', TeacherSchema)