const mongoose = require('mongoose')


const PropertyScheama =  new mongoose.Schema({
  examname:{
    type:String,
    required:true
  },
  description: {
    type:String
  },
  score: {
    type:Number
  },
  created:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Property', PropertyScheama)