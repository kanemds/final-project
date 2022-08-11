const express = require("express");
const router = express.Router();
const exams = require("./exams");
const questions = require("./questions");
const answers = require("./answers");
<<<<<<< HEAD
const categories = require('./categories')
=======
>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
const plan = require("./account");
const stripe = require("./stripe");

const teacher = require("./teacher");
const student = require("./students");
const course = require("./courses");

const account = require("./account");


const score = require("./score");

<<<<<<< HEAD
router.use("/exams", exams);
router.use("/questions", questions);
router.use('/categories', categories)
=======
router.use("/questions", questions);
router.use("/exams", exams);

>>>>>>> 163b7eb4cc37fb53b12fb92c580f39fa4f346cf9
router.use("/answers", answers);
// router.use("/account", plan);
router.use("/stripe", stripe);


router.use("/teacher", teacher);
router.use("/student", student);
router.use('/course', course)
router.use('/score', score)
router.use("/account", account);
router.use("/course", course);




module.exports = router;
