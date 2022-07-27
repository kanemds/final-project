const express = require('express')
const router = express.Router()
const exams = require('./exams')
const questions = require('./questions')
const answers = require('./answers')

router.use('/questions', questions)
router.use('/exams', exams)
router.use('/answers', answers)

module.exports = router

