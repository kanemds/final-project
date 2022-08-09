const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const router = express.Router();
const Plan = require("../models/plan");
const Account = require("../models/extra/account");
const account = require("../models/extra/account");

router.get("/billing", (req, res) => {
  Plan.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/billing", (req, res) => {
  const plan = new Plan({
    plan: req.body.plan,
    price: req.body.price,
    term: req.body.term,
  });
  plan
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/teacher/account/new", (req, res) => {
  console.log("Nosa did we get here?");
  const account = Account({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    user: req.body.user,
  });
  account
    .save()
    .then((data) => res.json(data))
    .catch((error) => {
      res.json(error);
    });
});

router.put("/account/:id", (req, res) => {
  account
    .findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    )
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.delete("/account/account/:id", (req, res) => {
  student
    .findOneAndDelete({
      _id: req.params.id,
    })
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
  Account.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.json(error);
    });
});
router.get("/:id", (req, res) => {
  const doc = Account.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
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
              as: "students",
            },
          },
        ],
      },
    },
  ])
    .exec()
    .then((result) => {
      // console.log(result);
      res.json(result[0]);
    });
});

router.delete("/account/:id", (req, res) => {
  account
    .findOneAndDelete({
      _id: req.params.id,
    })
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.post("/:id/edit", (req, res) => {
  account
    .findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          account: req.body.account,
        },
      }
    )
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
module.exports = router;
