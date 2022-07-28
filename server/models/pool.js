const mongoose = require('mongoose')

const PoolSchema = new mongoose.Schema({
  content:{
    type:String,
    required:true
  },
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

module.exports = mongoose.model('Pool', PoolSchema)