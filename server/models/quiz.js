const mongoose = require('mongoose')


const QuizScheama =  new mongoose.Schema({
  category:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required: true
  },
  one:{
    type: String,
    required: true
  },
  two:{
    type:String,
    required:true
  },
  three: {
    type:String,
    required:true
  },
  four:{
    type:String,
    required:true
  },
  students:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Students"
    }
  ],
  teachers:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Teachers"
    }
  ],
  data:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Quiz', QuizScheama)