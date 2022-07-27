const express = require('express')

const router = express.Router()
const Plan = require('../models/plan')

router.post('/', (req, res) => {
  const plan = new Plan ({
    plan: req.body.plan,
    price:req.body.price,
    term:req.body.term
  })
  plan.save()
    .then(data => {      
      res.json(data)
    })
    .catch(error => {
      res.json(error)
    })
})

module.exports = router





