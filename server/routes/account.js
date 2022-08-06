const express = require("express");

const router = express.Router();
const Plan = require("../models/plan");

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

router.post("/account/new", (req, res) => {
  const account = new account({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  });
  account
    .save()
    .then((data) => res.json(data))
    .catch((error) => {
      res.json(error);
    });
});

router.put("/account/:id", (req, res) => {
  console.log("did we get here?");
  account
    .updateOne(
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

router.delete("/teacher/account/:id", (req, res) => {
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

module.exports = router;
