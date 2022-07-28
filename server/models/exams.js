const mongoose = require('mongoose')

const ExamScheama = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  pools:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Pool"
    }
  ],
  created:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Exams', ExamScheama)