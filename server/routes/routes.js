const express = require('express')
const router = express.Router()
const exams = require('./exams')
const pools = require('./pools')
const questions = require('./questions')
const answers = require('./answers')
const plan = require('./account')
const stripe = require('./stripe')

router.use('/questions', questions)
router.use('/exams', exams)
router.use('/pools', pools)
router.use('/answers', answers)
router.use('/account', plan)
router.use('/stripe', stripe)
module.exports = router

