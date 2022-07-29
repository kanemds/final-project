const express = require('express')
const router = express.Router()
const Pool = require('../models/pool')

router.post('/new', (req, res) => {
  if (req.body.content.length < 0) {
    res.status(400)
    return
  }
  const pool = new Pool({
    content: req.body.content
  })
  pool.save()
  .then(p => res.json(p))
  .catch(e => res.json(e))
})

module.exports = router;