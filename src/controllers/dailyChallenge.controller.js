const express = require("express");

const mongoose = require("mongoose");

const moment = require("moment");

const DailyChallenge = require("../models/dailychallenge.model");

const User = require("../models/user.model");
const { distinct } = require("../models/dailychallenge.model");

const router = express.Router();

//function to get all ids according to given model

async function getAllIds(model, filter) {
  // Filter and get unique ids from any model
  return await mongoose
    .model(model)
    .find({ ...filter })
    .distinct("_id");
}

router.post("/", async (req, res) => {
  try {
    const dailychallenge = await DailyChallenge.create(req.body);

    return res.status(200).send(dailychallenge);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const dailychallenge = await DailyChallenge.find().lean().exec();

    return res.status(200).send(dailychallenge);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
