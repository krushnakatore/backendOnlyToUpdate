const express = require("express");

const app = express();

app.use(express.json());

const cors = require("cors");

app.use(cors());

const userController = require("./controllers/user.controller");
const dailychallengeController = require("./controllers/dailychallenge.controller");
const userstatusController = require("./controllers/userStatus.controller");
const assetsController = require("./controllers/assets.controller");

app.use("/dailychallenge", dailychallengeController);
app.use("/userstatus", userstatusController);
app.use("/assets", assetsController);
module.exports = app;
//
