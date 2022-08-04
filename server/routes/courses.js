const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId;
const Course = require('../models/course')

router.post('/new', (req, res) => {
  const teacherId = req.session.teacherId
  const course = new Course({
    name: req.body.name,
    teachers: [teacherId]
  })
  course.save()
    .then(data =>
      res.json(data))
    .then()
    .catch(error => {
      res.json(error)
    })
}
)

router.post('/:id/edit', (req, res) => {
  Course.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $push: {
        name: req.body.name
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
  const doc = Course.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $limit: 1 },
    {
      $lookup: {
        from: "teachers",
        localField: "teachers",
        foreignField: "_id",
        as: "teachers",
        pipeline: [
          {
            $lookup: {
              from: "students",
              localField: "students",
              foreignField: "_id",
              as: "students"
            }
          }
        ],
        pipeline: [
          {
            $lookup: {
              from: "exams",
              localField: "exams",
              foreignField: "_id",
              as: "exams"
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
  Course.find()
    .then(data => {
      res.send(data);
    }).catch(error => {
      res.json(error);
    });
})

router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Course.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})



router.delete('/:id', (req, res) => {
  Course.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return res.json({ err: "Course not found" })
    }
    return res.status(202).send()
  })
})

module.exports = router