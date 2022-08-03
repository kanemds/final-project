const mongoose = require('mongoose')

const ExamScheama = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  categories:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category"
    }
  ],
  questions:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Question"
    }
  ],
  created:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Exam', ExamScheama)