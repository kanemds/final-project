const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  course: {
    type: String,
  },
  exam: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
  ],
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentsSchema);
