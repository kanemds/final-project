const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const Course = require("../models/course");

router.post("/new", (req, res) => {
  const teacherId = req.session.teacherId;
  const course = new Course({
    name: req.body.name,
    teachers: [teacherId],
  });
  course
    .save()
    .then((data) => res.json(data))
    .then()
    .catch((error) => {
      res.json(error);
    });
});

router.post("/:id/edit", (req, res) => {
  const newDoc = req.body;
  for (let prop in newDoc) {
    if (!newDoc[prop]) {
      delete newDoc[prop];
      //it will remove fields who are undefined or null
    }
  }

  Course.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    newDoc,
    {
      // return doc after update is applied
      new: true,
      upsert: true,
    }
  )
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
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
              as: "students",
            },
          },
        ],
        pipeline: [
          {
            $lookup: {
              from: "exams",
              localField: "exams",
              foreignField: "_id",
              as: "exams",
            },
          },
        ],
      },
    },
  ])
    .exec()
    .then((result) => {
      console.log(result);
      res.json(result[0]);
    });
});

router.get("/", (req, res) => {
  Course.find()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.put("/teacher/courses/:id", (req, res) => {
  console.log("did we get here?", req, "response", res);
  student
    .updateOne({
      _id: req.params.id,
    })
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
  Course.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/:id", (req, res) => {
  Course.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return res.json({ err: "Course not found" });
    }
    return res.status(202).send();
  });
});

module.exports = router;
