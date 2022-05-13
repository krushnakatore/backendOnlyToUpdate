const mongoose = require("mongoose");

const worksheetjourneySchema = new mongoose.Schema(
  {
    sheetId: { type: mongoose.Schema.Types.ObjectId, ref: "sheets" },
    userId: String,
    awardedPoints: Number,
    percentage: Number,
    completed: { type: Boolean, default: false },
    journey: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "worksheetquestions",
        },
        attempts: [{ score: Number, correct: Boolean, answer: [String] }],
        score: Number,
      },
    ],
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("worksheetjourney", worksheetjourneySchema);
