const express = require("express");
const cors = require('cors')
require('dotenv').config();
const app = express();
app.use(express.json())
app.use(cors())

const Students = require("./models/students");

app.get('/students', async (req, res) => {
  const students = await Students.find()
  res.json(students)
})

app.post('/student/new', (req, res) => {
  const student = new Students ({
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    email: req.body.email,
    password: req.body.password
  })

  student.save()

  res.json(student)
})

app.delete('/student/delete/:id', async (req, res) => {
	const result = await Students.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/student/complete/:id', async (req, res) => {
	const student = await Students.findById(req.params.id);

	student.complete = !student.complete;

	student.save();

	res.json(todo);
})

app.put('/student/update/:id', async (req, res) => {
	const student = await Students.findById(req.params.id);

	student.text = req.body.text;

	student.save();

	res.json(student);
});


app.listen(3001, () => {
  console.log(`Server listening on ${3001}`);
});


