const mongoose = require('mongoose')


const PlanScheama =  new mongoose.Schema({
  plan:{
    type:String,
    required:true
  },
  price: {
    type:Number
  },
  term: {
    type:String
  }
})

module.exports = mongoose.model('Plan', PlanScheama)