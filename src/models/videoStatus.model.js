const mongoose = require("mongoose");

const videostatusSchema = new mongoose.Schema(
  {
    videoId: String,
    userId: String,
    percentage: Number,
    watched: { type: Boolean, default: false },
    awarded: { type: Boolean, default: false },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("videostatus", videostatusSchema);
