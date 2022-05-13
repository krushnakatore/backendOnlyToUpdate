const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    challengeType: String,
    points: Number,
    gameType: String,
    completed: Boolean,
    result: Boolean,
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("challenge", challengeSchema);
