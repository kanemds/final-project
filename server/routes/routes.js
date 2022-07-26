const express = require('express')
const router = express.Router()
const exam = require('./exam')
const questions = require('./questions')
const answers = require('./answers')

router.use('/questions', questions)
router.use('/exam', exam)
router.use('/answers', answers)

module.exports = router

