const mongoose = require("mongoose");

const newvideoSchema = new mongoose.Schema(
  {
    thumbnail: String,
    videoUrl: String,
    videoName: String,
    week: Number,
    ageGroup: String,
    tab: String,
    points: Number,
    videoDescription: String,
    videoAction: Boolean,
    actionLabel: String,
    actionType: String,
    actionApp: String,
    actionLink: String,
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("newvideo", newvideoSchema);
