const express = require("express");
const router = express.Router();
const exams = require("./exams");
const pools = require("./pools");
const questions = require("./questions");
const answers = require("./answers");
const plan = require("./account");
const stripe = require("./stripe");
const property = require("./property");
const feedback = require("./feedback");
const student = require("./students");

router.use("/questions", questions);
router.use("/exams", exams);
router.use("/pools", pools);
router.use("/answers", answers);
router.use("/account", plan);
router.use("/stripe", stripe);
router.use("/property", property);
router.use("/feedback", feedback);
router.use("/students", students);

module.exports = router;
