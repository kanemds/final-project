const express = require("express");
const router = express.Router();
const exams = require("./exams");
const questions = require("./questions");
const answers = require("./answers");
const categories = require('./categories')
const plan = require("./account");
const stripe = require("./stripe");

const teacher = require("./teacher");
const student = require("./students");
const course = require("./courses");

const account = require("./account");


const score = require("./score");


router.use("/exams", exams);
router.use("/questions", questions);
router.use('/categories', categories)

router.use("/answers", answers);
// router.use("/account", plan);
router.use("/stripe", stripe);


router.use("/teacher", teacher);
router.use("/student", student);
router.use('/course', course)
router.use('/score', score)
router.use("/account", account);




module.exports = router;
