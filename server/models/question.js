const mongoose = require('mongoose')

const QuestionScheama =  new mongoose.Schema({
  content:{
    type: String,
    required: true
  },
  answers:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer"
    }
  ],
  correctAnswer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  created:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Question', QuestionScheama)