const mongoose = require('mongoose')


const CourseScheama =  new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required: true
  },
  created:{
    type:Date,
    default: Date.now
  },
  updated:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Course', CourseScheama)