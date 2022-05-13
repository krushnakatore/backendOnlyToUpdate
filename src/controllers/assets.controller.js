const express = require("express");

const mongoose = require("mongoose");

const moment = require("moment");

const Assets = require("../models/assests.model");

const User = require("../models/user.model");

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
    const assets = await Assets.create(req.body);

    return res.status(200).send(assets);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    let arr = [
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
    ];
    const assets = await mongoose.model("assets").aggregate([
      {
        $match: { week: { $in: arr } },
      },
      {
        $project: {
          week: "$week",
        },
      },
    ]);

    return res.status(200).send(assets);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
