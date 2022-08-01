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
    ref: "Answer"
  },
  order: {
    type: Number,
    required: true
  },
  created:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Question', QuestionScheama)