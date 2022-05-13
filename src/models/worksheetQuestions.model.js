const mongoose = require("mongoose");

const worksheetquestionsSchema = new mongoose.Schema(
  {
    type: String,
    question: String,
    option: [String],
    answerIndex: Number,
    points: Number,
    leftcolumn: [String],
    rightcolumn: [String],
    referenceTotalOptions: Number,
    referenceCorrectOptions: Number,
    reference: String,
    referenceCorrectOption: [String],
    referenceIncorrectOption: [String],
    status: { type: Boolean, default: false },
    sheetid: String,
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("worksheetquestions", worksheetquestionsSchema);
