const mongoose = require("mongoose");

const assetsSchema = new mongoose.Schema(
  {
    name: String,
    size: String,
    type: String,
    dataType: String,
    week: String,
    updated: String,
    surl: String,
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("assets", assetsSchema);
