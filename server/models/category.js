const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
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
  lastEdited:{
    type:Date,
    default: Date.now
  },
  created:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Category', CategorySchema)