const express = require('express')
const router = express.Router()
const exam = require('./exam')
const questions = require('./questions')
const answers = require('./answers')
const plan = require('./account')

router.use('/questions', questions)
router.use('/exam', exam)
router.use('/answers', answers)
router.use('/account', plan)
module.exports = router

