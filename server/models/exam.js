const mongoose = require('mongoose')

const ExamScheama = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  passScore:{
    type:Number
  },
  instructions: {
    type:String
  },
  passFeedback: {
    type:String
  },
  failFeedback: {
    type:String
  },
  questions:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Question"
    }
  ],
  categories:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category"
    }
  ],
  created:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Exam', ExamScheama)