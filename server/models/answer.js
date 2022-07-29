const mongoose = require('mongoose')

const AnswerScheama =  new mongoose.Schema({
  content:{
    type:String,
    required: true
  },
  created:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Answer', AnswerScheama)