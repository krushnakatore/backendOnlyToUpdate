const mongoose = require("mongoose");

const sheetsSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    level: String,
    age: String,
    remedial: Boolean,
    status: { type: Boolean, default: false },
    thumbnail: String,
    questions: [String],
    week: String,
    subject: String,
    worksheetId: String,
    assessmentMonth: Number,
    assessmentSubject: String,
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("sheets", sheetsSchema);
