const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    picture: String,
    email: String,
    phoneNumber: String,
    address: String,
    state: String,
    city: String,
    zipCode: String,
    provider: String,
    accessToken: String,
    uid: String,
    gender: Number,
    adId: String,
    startDate: { type: Date },
    newTourCompleted: { type: Number, default: 0 },
    newChildAge: String,
    childGender: String,
    eulaTimestamp: Date,
    OnboardingComplete: { type: Boolean },
    childName: String,
    childSchoolType: String,
    childSchoolName: String,
    childSchoolCity: String,
    childSchoolState: String,
    partnerUser: Boolean,
    score: { type: Number },
    rank: { type: Number },
    leaderboardScore: { type: Number },
    currentWeek: { type: Number, default: 1 },
    uninstall: { type: Boolean, default: false },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
