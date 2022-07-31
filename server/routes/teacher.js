const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId;
const Teacher = require('../models/teacher')

router.post('/new', (req, res) => {
  const teacher = new Teacher ({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email:req.body.email
  })
  teacher.save()
    .then(data =>     
      res.json(data))
    .catch(error => {
      res.json(error)
    })
  }
)

router.post('/:id/edit', (req, res) => {
  Teacher.findOneAndUpdate(
    {
      _id: req.params.id
    }, 
    { 
      $push: {
        "teacher": req.body.teacher
      }
    }, {
      // return doc after update is applied
      new: true,
      upsert: true 
    }
  ).exec().then((data) => {
    res.json(data)
  }).catch((err) => console.log(err))  
})


router.get('/:id', (req, res) => {
  const doc = Teacher.aggregate([
    { $match: { _id: ObjectId(req.params.id) }},
    { $limit: 1 },
    {
      $lookup: {
        from: "exams",
        localField: "exams",
        foreignField: "_id",
        as: "exams",
        pipeline: [
          {
            $lookup: {
              from: "students",
              localField: "students",
              foreignField: "_id",
              as: "students"
            }
          }
        ]
      }
    }
  ]).exec().then((result) => {
    console.log(result)
    res.json(result[0])
  })
})

router.get('/', (req, res) => {
  Teacher.find()
  .then(data => {
    res.send(data);
  }).catch(error => {
    res.json(error);
  });
})

module.exports = router