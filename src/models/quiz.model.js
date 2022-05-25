const mongoose = require("mongoose");

const quizjourneySchema = new mongoose.Schema(
  {
    userId: String,
    attempts: [
      {
        questionId: String,
        week: Number,
        correct: Boolean,
        questionNumber: Number,
        awarded: Boolean,
        selectedIndex: Number,
      },
    ],
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("quizjourney", quizjourneySchema);
