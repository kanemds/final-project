const express = require('express')
const router = express.Router()
const exams = require('./exams')
const questions = require('./questions')
const answers = require('./answers')
const categories = require('./categories')
const plan = require('./account')
const stripe = require('./stripe')

router.use('/exams', exams)
router.use('/questions', questions)
router.use('/answers', answers)
router.use('/categories', categories)
router.use('/account', plan)
router.use('/stripe', stripe)
module.exports = router

