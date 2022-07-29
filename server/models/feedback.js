const mongoose = require('mongoose')

const FeedbackScheama = new mongoose.Schema({
  pass:{
    type:String,
    required:true
  },
  fail:{
    type:String,
    required:true
  },
  created:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Feedback', FeedbackScheama)