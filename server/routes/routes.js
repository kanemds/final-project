
const express = require("express");
const router = express.Router();
const exams = require("./exams");
const questions = require("./questions");
const answers = require("./answers");
const plan = require("./account");
const stripe = require("./stripe");

const teacher = require("./teacher");
const student = require("./students");
const course = require("./courses");

const score = require("./score");


router.use("/questions", questions);
router.use("/exams", exams);

router.use("/answers", answers);
router.use("/account", plan);
router.use("/stripe", stripe);


router.use("/teacher", teacher);
router.use("/student", student);
router.use('/course', course)

router.use('/score', score)


module.exports = router;
