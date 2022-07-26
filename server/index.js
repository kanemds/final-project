const express = require("express");
const cors = require('cors')
require('dotenv').config();
const app = express();

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to DB')
  
  app.listen(3001, () => {
    console.log(`Server listening on ${3001}`);
  });
})
.catch(console.error)


app.use(express.json())
app.use(cors())

const routes = require('./routes/routes')

app.use('/', routes)

// const Students = require("./models/extra/student");


// app.get('/students', async (req, res) => {
//   const students = await Students.find()
//   res.json(students)
// })

// app.post('/student/new', (req, res) => {
//   const student = new Students ({
//     firstname: req.body.firstname,
//     lastname:req.body.lastname,
//     email: req.body.email,
//     password: req.body.password
//   })

//   student.save()

//   res.json(student)
// })

// app.delete('/student/delete/:id', async (req, res) => {
// 	const result = await Students.findByIdAndDelete(req.params.id);

// 	res.json({result});
// });

// app.get('/student/complete/:id', async (req, res) => {
// 	const student = await Students.findById(req.params.id);

// 	student.complete = !student.complete;

// 	student.save();

// 	res.json(todo);
// })

// app.put('/student/update/:id', async (req, res) => {
// 	const student = await Students.findById(req.params.id);

// 	student.text = req.body.text;

// 	student.save();

// 	res.json(student);
// });

