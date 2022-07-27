const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  exams:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Exam"
    }
  ],
  teachers:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Teacher"
    }
  ],
  data:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Student', studentsSchema)