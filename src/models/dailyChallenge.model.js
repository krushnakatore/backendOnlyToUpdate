const mongoose = require("mongoose");

const dailychallengeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "challenge" }],
    challengeDate: { type: Date },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("dailychallenge", dailychallengeSchema);
