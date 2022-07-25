const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentsSchema = new Schema({
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
  data:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Students', studentsSchema)