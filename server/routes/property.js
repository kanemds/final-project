const express = require('express')
const router = express.Router()
const Property = require('../models/property')

router.post('/new', (req, res) => {

  const property = new Property({
    examname: req.body.content,
    description: req.body.description,
    score: req.body.score
  })
  property.save()
  .then(p => res.json(p))
  .catch(e => res.json(e))
})

module.exports = router;
