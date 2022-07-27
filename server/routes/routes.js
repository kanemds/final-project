const express = require('express')
const router = express.Router()
const exams = require('./exams')
const questions = require('./questions')
const answers = require('./answers')
const plan = require('./account')

router.use('/questions', questions)
router.use('/exams', exams)
router.use('/answers', answers)
router.use('/account', plan)
module.exports = router

