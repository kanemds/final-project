const express = require('express')
const router = express.Router()
const Answer = require('../models/answer')

router.get('/', (req, res) => {
  Answer.find()
    .then(data => {
      res.send(data);
    }).catch(error => {
      res.json(error);
    });
})

router.post('/new', (req, res) => {
  const answer = new Answer({
    content: req.body.content
  })
  answer.save()
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      res.json(error)
    })
})

router.post('/delete', async (req, res) => {
  const doc = await Answer.findOneAndDelete(
    {
      _id: req.body.answerId
    }
  );
  res.send(doc);
})

module.exports = router