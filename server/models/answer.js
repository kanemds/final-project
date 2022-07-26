const mongoose = require('mongoose')


const AnswerScheama =  new mongoose.Schema({
  content:{
    type:String,
    required: true
  }
})

module.exports = mongoose.model('Answer', AnswerScheama)