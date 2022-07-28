const express = require('express')

const router = express.Router()
const Plan = require('../models/plan')

router.get('/billing', (req, res) => {
  Plan.find()
  .then(data => {
    res.send(data);
  }).catch(error => {
    res.json(error);
  });
})

router.post('/billing', (req, res) => {
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





