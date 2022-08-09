const mongoose = require('mongoose')


const teachersSchema = new Schema({
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
  quizzes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Quiz"
    }
  ],
  students:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Student"
    }
  ],
  data:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Teacher', teachersSchema)