const express = require("express");

const cors = require('cors')

require('dotenv').config();
const app = express();


app.use(express.json())
app.use(cors())

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB'))
  .catch(console.error)


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



app.listen(3001, () => {
  console.log(`Server listening on ${3001}`);
});


