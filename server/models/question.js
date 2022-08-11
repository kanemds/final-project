const mongoose = require('mongoose')

const QuestionScheama = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  points:{
    type: Number,
    required: true
  },
=======
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer"
    }
  ],
  correctAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer"
  },
<<<<<<< HEAD
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  used:{
    type: Boolean,
    default: true
  },
=======
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Question', QuestionScheama)