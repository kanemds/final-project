const express = require('express')
const router = express.Router()
const Feedback = require('../models/feedback')

router.post('/new', (req, res) => {
  const feedback = new Feedback ({
    pass: req.body.pass,
    fail: req.body.fail
  })
  feedback.save()
    .then(data => {      
      res.json(data)
    })
    .catch(error => {
      res.json(error)
    })
})

module.exports = router