const express = require("express");

const mongoose = require("mongoose");

const UserStatus = require("../models/userStatus.model");

const Sheets = require("../models/sheets.model");

const WorksheetJourney = require("../models/worksheetJourney.model");

const newVideo = require("../models/newVideo.model");

const videosStatus = require("../models/videoStatus.model");

const User = require("../models/user.model");

const Assets = require("../models/assests.model");

const QuizJourney = require("../models/quiz.model");

let uninstalledData = require("../../csvjson (2).json");

let actionIndiaUsers = require("../../AIUsers.json");

const moment = require("moment");
const { updateOne } = require("../models/userStatus.model");

const router = express.Router();

async function modelUpdate(model, filter) {
  return await mongoose
    .model(model)
    .find({ ...filter })
    .limit(2)
    .sort()
    .distinct("_id");
}

router.post("/", async (req, res) => {
  try {
    const userStatus = await UserStatus.create(req.body);

    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    // 1. Get the user to update userStatus which are not uninstalled yet

    let userNotUninstalled = await modelUpdate("user", { uninstall: false });

    let id1 = userNotUninstalled;

    userNotUninstalled = userNotUninstalled.map((userId) => String(userId));

    // updating userstatus as uninstalled true means

    // uninstalledData.forEach(async (ele) => {
    //   let id = mongoose.Types.ObjectId(ele._id);

    //   let data = await mongoose
    //     .model("user")
    //     .findByIdAndUpdate({ _id: id }, { $set: { uninstall: true } });
    // });

    // set all the data initially to 0;

    // let initialData = await mongoose.model("userstatus").updateMany(
    //   { _id: { $in: id1 } },
    //   {
    //     $set: {
    //       totalWorksheetsAttempted: 0,
    //       totalWorksheetsCompleted: 0,
    //       totalMathWorksheetsAttempted: 0,
    //       totalMathWorksheetsCompleted: 0,
    //       totalEnglishWorksheetsAttempted: 0,
    //       totalEnglishWorksheetsCompleted: 0,
    //       totalHindiWorksheetsAttempted: 0,
    //       totalHindiWorksheetsCompleted: 0,
    //       totalVideosStart: 0,
    //       totalVideosCompleted: 0,
    //       totalChildVidStart: 0,
    //       totalChildVidCompleted: 0,
    //       totalParentVidStart: 0,
    //       totalParentVidCompleted: 0,
    //       totalViewAndDoVidStart: 0,
    //       totalViewAndDoVidCompleted: 0,
    //       totalQuestionWSAttempted: 0,
    //       totalQuestionWSCompleted: 0,
    //       totalQuizQuestionCompleted: 0,
    //       totalQuizQuestionAttempted: 0,
    //       totalScoreMathMnth1: 0,
    //       totalScoreEngMnth1: 0,
    //       totalScoreHinMnth1: 0,
    //       totalScoreMathMnth2: 0,
    //       totalScoreEngMnth2: 0,
    //       totalScoreHinMnth2: 0,
    //       totalScoreMathMnth3: 0,
    //       totalScoreEngMnth3: 0,
    //       totalScoreHinMnth3: 0,
    //       totalScoreMathMnth4: 0,
    //       totalScoreEngMnth4: 0,
    //       totalScoreHinMnth4: 0,
    //       totalScoreMathMnth5: 0,
    //       totalScoreEngMnth5: 0,
    //       totalScoreHinMnth5: 0,
    //       totalScoreMathMnth6: 0,
    //       totalScoreEngMnth6: 0,
    //       totalScoreHinMnth6: 0,
    //       totalScoreMathMnth7: 0,
    //       totalScoreEngMnth7: 0,
    //       totalScoreHinMnth7: 0,
    //       totalScoreMathMnth8: 0,
    //       totalScoreEngMnth8: 0,
    //       totalScoreHinMnth8: 0,
    //       totalScoreMathMnth9: 0,
    //       totalScoreEngMnth9: 0,
    //       totalScoreHinMnth9: 0,
    //       totalScoreMathMnth10: 0,
    //       totalScoreEngMnth10: 0,
    //       totalScoreHinMnth10: 0,
    //       totalScoreMathMnth11: 0,
    //       totalScoreEngMnth11: 0,
    //       totalScoreHinMnth11: 0,
    //       totalScoreMathMnth12: 0,
    //       totalScoreEngMnth12: 0,
    //       totalScoreHinMnth12: 0,
    //     },
    //   },
    //   { Many: true }
    // );

    //2. Find the status fo the users who has attempted and completed the worksheets

    // let TotalWSJourney = await mongoose.model("worksheetjourney").aggregate([
    //   {
    //     $match: {
    //       userId: { $in: userNotUninstalled },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$userId",
    //       attemptCount: { $sum: 1 },
    //       completionCount: {
    //         $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] },
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       attempted: "$attemptCount",
    //       completed: "$completionCount",
    //     },
    //   },
    // ]);

    //3.Update Total Workshhet attempted and completed data in userstatus

    // TotalWSJourney.forEach(async (ele) => {
    //   let newId = mongoose.Types.ObjectId(ele._id);
    //   let updateAttemptedWSdata = await mongoose
    //     .model("userstatus")
    //     .findOneAndUpdate(
    //       {
    //         _id: newId,
    //       },

    //       {
    //         $set: {
    //           totalWorksheetsAttempted: ele.attempted,
    //           totalWorksheetsCompleted: ele.completed,
    //         },
    //       }
    //     );
    //   // console.log(updateAttemptedWSdata);
    // });

    //4. Update the total number of Math,English and Hindi worksheetjourney attempted and completed

    // let subjects = ["Math", "English", "Hindi"];

    // async function subjectWiseUpdate(subject) {
    //   // console.log(subject, subjectAttmpt, subjectComp);
    //   let subjectJourneyAttempted = await modelUpdate("sheets", {
    //     subject: `${subject}`,
    //   });

    //   // console.log(`${subject}`, subjectJourneyAttempted);

    //   // //5. Find this Maths,English and Hindi sheets in user and update

    //   let SubjectsJourney = await mongoose.model("worksheetjourney").aggregate([
    //     {
    //       $match: {
    //         userId: { $in: userNotUninstalled },
    //         sheetId: { $in: subjectJourneyAttempted },
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: "$userId",
    //         attemptCount: { $sum: 1 },
    //         completionCount: {
    //           $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] },
    //         },
    //       },
    //     },
    //     {
    //       $project: {
    //         attempted: "$attemptCount",
    //         completed: "$completionCount",
    //       },
    //     },
    //   ]);

    //   return SubjectsJourney;
    // }

    // // //6. update attempted and completed status in userstatus for each subjects of user
    // subjects.forEach(async (ele) => {
    //   switch (ele) {
    //     case "Math":
    //       let value = await subjectWiseUpdate(ele);
    //       // console.log(ele, value);
    //       value.forEach(async (ele) => {
    //         let newId = mongoose.Types.ObjectId(ele._id);
    //         let updateAttemptedWSdata = await mongoose
    //           .model("userstatus")
    //           .findOneAndUpdate(
    //             {
    //               _id: newId,
    //             },

    //             {
    //               $set: {
    //                 totalMathWorksheetsAttempted: ele.attempted,
    //                 totalMathWorksheetsCompleted: ele.completed,
    //               },
    //             }
    //           );
    //       });
    //       break;
    //     case "English":
    //       {
    //         let value = await subjectWiseUpdate(ele);
    //         // console.log(ele, value);
    //         value.forEach(async (ele) => {
    //           let newId = mongoose.Types.ObjectId(ele._id);
    //           let updateAttemptedWSdata = await mongoose
    //             .model("userstatus")
    //             .findOneAndUpdate(
    //               {
    //                 _id: newId,
    //               },

    //               {
    //                 $set: {
    //                   totalEnglishWorksheetsAttempted: ele.attempted,
    //                   totalEnglishWorksheetsCompleted: ele.completed,
    //                 },
    //               }
    //             );
    //         });
    //       }
    //       break;
    //     case "Hindi": {
    //       let value = await subjectWiseUpdate(ele);
    //       console.log(ele, value);
    //       value.forEach(async (ele) => {
    //         let newId = mongoose.Types.ObjectId(ele._id);
    //         let updateAttemptedWSdata = await mongoose
    //           .model("userstatus")
    //           .findOneAndUpdate(
    //             {
    //               _id: newId,
    //             },

    //             {
    //               $set: {
    //                 totalHindiWorksheetsAttempted: ele.attempted,
    //                 totalHindiWorksheetsCompleted: ele.completed,
    //               },
    //             }
    //           );
    //       });
    //       break;
    //     }
    //   }
    // });

    // 7.task is to find all videos watched, all Child video,all Parent video and all View and do videos by the user

    // let videosWatched = ["", "Child", "Parent", "View and do"];

    // async function videoWiseUpdate(video) {
    //   // console.log(subject, subjectAttmpt, subjectComp);
    //   let videoJourneyAttempted;

    //   videoJourneyAttempted = await modelUpdate("newvideo", {
    //     tab: `${video}`,
    //   });

    //   videoJourneyAttempted = videoJourneyAttempted.map((videoId) =>
    //     String(videoId)
    //   );

    // console.log(`${video}`, videoJourneyAttempted);

    // //5. Find this Maths,English and Hindi sheets in user and update

    //   let videosJourney = await mongoose.model("videostatus").aggregate([
    //     {
    //       $match: {
    //         userId: { $in: userNotUninstalled },
    //         videoId: { $in: videoJourneyAttempted },
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: "$userId",
    //         attemptCount: { $sum: 1 },
    //         completionCount: {
    //           $sum: { $cond: [{ $eq: ["$watched", true] }, 1, 0] },
    //         },
    //       },
    //     },
    //     {
    //       $project: {
    //         attempted: "$attemptCount",
    //         completed: "$completionCount",
    //       },
    //     },
    //   ]);

    //   return videosJourney;
    // }

    // videosWatched.forEach(async (ele) => {
    //   switch (ele) {
    //     case "Child":
    //       {
    //         let value = await videoWiseUpdate(ele);
    // console.log(ele, value);
    // value.forEach(async (ele) => {
    //   let newId = mongoose.Types.ObjectId(ele._id);
    //   let updateAttemptedWSdata = await mongoose
    //     .model("userstatus")
    //     .findOneAndUpdate(
    //       {
    //         _id: newId,
    //       },

    //       {
    //         $set: {
    //           totalChildVidStart: ele.attempted,
    //           totalChildVidCompleted: ele.completed,
    //         },
    //       }
    //     );
    // });
    //   }
    //   break;
    // case "Parent":
    //   {
    //     let value = await videoWiseUpdate(ele);
    // console.log(ele, value);
    // value.forEach(async (ele) => {
    //   let newId = mongoose.Types.ObjectId(ele._id);
    //   let updateAttemptedWSdata = await mongoose
    //     .model("userstatus")
    //     .findOneAndUpdate(
    //       {
    //         _id: newId,
    //       },

    //       {
    //         $set: {
    //           totalParentVidStart: ele.attempted,
    //           totalParentVidCompleted: ele.completed,
    //         },
    //       }
    //     );
    // });
    //   }
    //   break;
    // case "View and do":
    //   {
    //     let value = await videoWiseUpdate(ele);
    // console.log(ele, value);
    // value.forEach(async (ele) => {
    //   let newId = mongoose.Types.ObjectId(ele._id);
    //   let updateAttemptedWSdata = await mongoose
    //     .model("userstatus")
    //     .findOneAndUpdate(
    //       {
    //         _id: newId,
    //       },

    //       {
    //         $set: {
    //           totalViewAndDoVidStart: ele.attempted,
    //           totalViewAndDoVidCompleted: ele.completed,
    //         },
    //       }
    //     );
    // });
    //       }
    //       break;
    //     case "":
    //       {
    //         let videoJourneyAttempted = await modelUpdate("newvideo");

    //         videoJourneyAttempted = videoJourneyAttempted.map((videoId) =>
    //           String(videoId)
    //         );

    //         let videosJourney = await mongoose.model("videostatus").aggregate([
    //           {
    //             $match: {
    //               userId: { $in: userNotUninstalled },
    //               // videoId: { $in: videoJourneyAttempted },
    //             },
    //           },
    //           {
    //             $group: {
    //               _id: "$userId",
    //               attemptCount: { $sum: 1 },
    //               completionCount: {
    //                 $sum: { $cond: [{ $eq: ["$watched", true] }, 1, 0] },
    //               },
    //             },
    //           },
    //           {
    //             $project: {
    //               attempted: "$attemptCount",
    //               completed: "$completionCount",
    //             },
    //           },
    //         ]);

    //         console.log("videosJourney", videosJourney);

    //         videosJourney.forEach(async (ele) => {
    //           let newId = mongoose.Types.ObjectId(ele._id);
    //           let updateAttemptedWSdata = await mongoose
    //             .model("userstatus")
    //             .findOneAndUpdate(
    //               {
    //                 _id: newId,
    //               },

    //               {
    //                 $set: {
    //                   totalVideosStart: ele.attempted,
    //                   totalVideosCompleted: ele.completed,
    //                 },
    //               }
    //             );
    //         });
    //       }
    //       break;
    //   }
    // });

    // new field to be total questions of worksheet attempted and completed by a user

    // find all individual users in worksheetjourney

    // let sheets = await modelUpdate("sheets");

    // sheets.forEach((sheetId) => mongoose.Types.ObjectId(sheetId));

    // let questions = await mongoose.model("worksheetjourney").aggregate([
    //   {
    //     $match: {
    //       userId: { $in: userNotUninstalled },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         _id: "$userId",
    //         journey: "$journey",
    //       },
    //     },
    //   },
    // ]);

    // console.log(questions);
    // let SheetsWithAssessment = await mongoose
    //   .model("sheets")
    //   .find({ assessmentMonth: { $gte: 1 } });

    // let SheetsWithAssessment = await modelUpdate("sheets", {
    //   assessmentMonth: { $gte: 1 },
    // });

    // let WSHasAssessment = await mongoose
    //   .model("worksheetjourney")
    //   .find({ sheetId: { $in: SheetsWithAssessment } });

    // let newdata = WSHasAssessment.map((ele) => {
    //   let score = 0;
    //   userNotUninstalled.map(async (user) => {
    //     let id = ele.sheetId;
    //     let data = await mongoose.model("sheets").find({ sheetId: id });

    //     if (
    //       ele.userId == user &&
    //       data.assessmentMonth == 1 &&
    //       data.assessmentSubject == "Math"
    //     ) {
    //       ele.journey.forEach((ele) => {
    //         score += ele.score;
    //       });
    //     }
    //   });

    //   console.log("user", score, ele.userId);
    // });

    // by bruteforce method trying to figure out what to do exactly

    // let user = await mongoose
    //   .model("userstatus")
    //   .find({})
    //   .updateMany({
    //     $set: { totalQuestionWSAttempted: 0, totalQuestionWSCompleted: 0 },
    //   });

    //lets check by doing update function so that it will not go heap out of memory

    // async function updateOneAttempted(user, value) {
    //   return await mongoose
    //     .model("userstatus")
    //     .findByIdAndUpdate(
    //       { _id: user },
    //       { $set: { totalQuestionWSAttempted: value } }
    //     );
    // }

    // async function updateOneCompleted(user, value) {
    //   return await mongoose
    //     .model("userstatus")
    //     .findByIdAndUpdate(
    //       { _id: user },
    //       { $set: { totalQuestionWSCompleted: value } }
    //     );
    // }

    let WSData = await mongoose.model("worksheetjourney").find({}).count();

    // // let userDataCompleted1 = {};
    // let userDataAttempted1;
    // let userDataCompleted1;
    // let completedCount = [];
    for (let i = 0; i < WSData; i = i + 10000) {
      let skip = i; //remaining need to update in 10 thousands or 20000 per iteration
      let limit = i + 10000;

      console.log("skip", skip, limit);
      completedCount.push(skip, limit);

      let WSDataOthe = await mongoose
        .model("worksheetjourney")
        .find({})
        .skip(skip)
        .limit(limit);

      userDataAttempted1 = {};
      userDataCompleted1 = {};

      // console.log(WSDataOthe);

      WSDataOthe.map((wJourney) => {
        // console.log(wJourney);
        if (userDataAttempted1[wJourney.userId] === undefined) {
          //   //calculate attempt and add it to userAttempts
          const attempt = wJourney.journey ? wJourney.journey.length : 0;
          // if attempt then check completion
          const completion = attempt
            ? wJourney.journey.reduce((acc, k) => {
                k.score > 0 ? acc++ : acc;
                return acc;
              }, 0)
            : 0;
          userDataAttempted1[wJourney.userId] = attempt || 0;
          userDataCompleted1[wJourney.userId] = completion || 0;
        } else {
          const attempt = wJourney.journey ? wJourney.journey.length : 0;
          // if attempt then check completion
          const completion = attempt
            ? wJourney.journey.reduce((acc, k) => {
                k.score ? acc++ : acc;
                return acc;
              }, 0)
            : 0;
          userDataAttempted1[wJourney.userId] += attempt;
          userDataCompleted1[wJourney.userId] += completion;
        }
      });

      // console.log(userDataCompleted1);

      // //we need to find that particular user in userstatus and update its values. for attempted and completed

      let userstatusArray = [];

      for (let key in userDataAttempted1) {
        let user = mongoose.Types.ObjectId(key);

        // let userStatusUser = await mongoose
        //   .model("userstatus")
        //   .find({ _id: user });
        // // console.log(userStatusUser);

        // if (userStatusUser[0]) {
        //   let value = userStatusUser[0].totalQuestionWSAttempted;
        //   value = value + userDataAttempted1[key];
        // console.log(value, userStatusUser[0]._id);
        // console.log(userStatusUser[0]._id, user);

        let updateQuestionStatus = await mongoose
          .model("userstatus")
          .findOneAndUpdate(
            { _id: user },
            { $set: { totalQuestionWSAttempted: value } }
          );
        console.log(updateQuestionStatus);
        // }
      }

      for (let key in userDataCompleted1) {
        let user = mongoose.Types.ObjectId(key);

        // console.log(key, user);

        let userStatusUser = await mongoose
          .model("userstatus")
          .find({ _id: user });
        // console.log(userStatusUser);

        if (userStatusUser[0]) {
          let value = userStatusUser[0].totalQuestionWSCompleted;
          value = value + userDataCompleted1[key];

          let updateQuestionStatus = await mongoose
            .model("userstatus")
            .findOneAndUpdate(
              { _id: user },
              { $set: { totalQuestionWSCompleted: value } }
            );
          console.log(updateQuestionStatus);
        }
      }
      console.log("true it is updating");

      //console.log("userDataAttempted1", userDataAttempted);
    }

    // console.log(completedCount);

    // let countAttempted;
    // let countCompleted;

    // userNotUninstalled.forEach((ele) => {
    //   let user = ele;
    //   countAttempted = 0;
    //   countCompleted = 0;

    //   WSData.forEach((ele) => {
    //     // console.log("ele.userId", ele.userId, "user", user);
    //     if (ele.userId == user) {
    //       console.log("true");
    //       if (ele.journey.length > 0) {
    //         // console.log("journey", ele.journey);
    //         let journey = ele.journey;
    //         journey.forEach((ele) => {
    //           countAttempted++;
    //           if (ele.score > 0) {
    //             countCompleted++;
    //           }
    //         });
    //       }
    //     }
    //   });
    //   console.log(
    //     user,
    //     "countAttempted",
    //     countAttempted,
    //     "countCompleted",
    //     countCompleted
    //   );
    // });

    // console.log("sheets", WSHasAssessment);

    // let reaminingUsers = await mongoose
    //   .model("user")
    //   .find({ uninstall: false })
    //   .count();

    // console.log("reaminingUsers", reaminingUsers);

    // // find user from remaining users which have completed or attempted video or WS or Quiz

    // const date = "2022-03-01";

    // let startDate = new Date(
    //   moment(date, "YYYY-MM-DD")
    //     .startOf("month")
    //     .format("YYYY-MM-DDTHH:mm:ss[Z]")
    // );
    // console.log("start of date", startDate);

    // let today = new Date().toISOString().slice(0, 10);

    // let todaydate = moment(today, "YYYY-MM-DD").format("YYYY-MM-DD:mm:ss[Z]");

    // console.log("end of date", today);

    // const dateObj = { $gte: startDate };

    // // video watched, WS completed or Quiz Completed

    // // 1. Video watched

    // let VideoWatched = await mongoose
    //   .model("videostatus")
    //   .find(
    //     {
    //       $and: [
    //         {
    //           userId: { $in: userNotUninstalled },
    //           updatedAt: { ...dateObj },
    //           $or: [{ watched: true }, { watched: false }],
    //           // watched: true,
    //         },
    //       ],
    //     },
    //     { userId: "$userId", _id: 0 }
    //   )
    //   .distinct("userId");

    // console.log("VideoWatched", VideoWatched);

    // //2.WS completed

    // let WSCompleted = await mongoose
    //   .model("worksheetjourney")
    //   .find(
    //     {
    //       $and: [
    //         {
    //           userId: { $in: userNotUninstalled },
    //           updatedAt: { ...dateObj },
    //           $or: [{ completed: true }, { completed: false }],
    //           // completed: true,
    //         },
    //       ],
    //     },
    //     { userId: "$userId", _id: 0 }
    //   )
    //   .distinct("userId");

    // console.log("VideoWatched", WSCompleted);

    // //3.Quiz completed

    // let QZCompleted = await mongoose
    //   .model("quizjourney")
    //   .find(
    //     {
    //       $and: [
    //         {
    //           userId: { $in: userNotUninstalled },
    //           updatedAt: { ...dateObj },
    //           // $or: [{ completed: true }, { completed: false }],
    //           // completed: true,
    //         },
    //       ],
    //     },
    //     { userId: "$userId", _id: 0 }
    //   )
    //   .distinct("userId");

    // console.log("QZCompleted", QZCompleted);

    // let data = [...VideoWatched, ...WSCompleted, ...QZCompleted];

    // let dataObj = {};

    // data.forEach((ele) => {
    //   if (dataObj[ele] === undefined) {
    //     dataObj[ele] = 1;
    //   }
    // });

    // console.log("data", Object.keys(dataObj).length);

    // console.log("QZCompleted", data.length);

    // check the data for sorting...

    // ** Task is to update total score for each subjects monthly assessment score

    // for eg totalScoreMathMnth1 we have to find this

    // finding WS journeys who has unistalled false and assessment {assessmentMonth:{$exists:true}} field in it

    // let sheets = await mongoose
    //   .model("worksheetjourney")
    //   .aggregate([
    //     { $match: { userId: { $in: userNotUninstalled } } },
    //     { $project: { sheetId: "$sheetId", _id: 0 } },
    //   ]);

    // console.log(sheets);

    // lets check how we can calculate fucntion to see spread operator

    // let assessmentMonth = "1";
    // async function calculate(model, filter) {
    //   console.log(model, filter[0], filter[1].assessmentMonth);
    // }

    // calculate("student", [
    //   { user: id1[0] },
    //   { assessmentMonth: assessmentMonth },
    // ]);

    // find out the users which are present in maharashtra

    // let arrayZip = [];

    // for (let i = 400000; i <= 445402; i++) {
    //   arrayZip.push(String(i));
    // }
    // //console.log(arrayZip);

    // let users = await mongoose
    //   .model("user")
    //   .find({
    //     zipCode: { $in: arrayZip },
    //   })
    //   .sort({ city: -1 });

    // // // console.log(users);

    // let usersMh = [];

    // users.forEach((element) => {
    //   usersMh.push(element._id.toString());
    // });

    // // console.log(usersMh);

    // let WSJourneyByMh = await mongoose.model("worksheetjourney").aggregate([
    //   { $match: { userId: { $in: usersMh } } },
    //   {
    //     $group: {
    //       _id: "$userId",
    //       attemptCount: { $sum: 1 },
    //       completionCount: {
    //         $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] },
    //       },
    //       // childAge: "$childAge",
    //       // currentWeek: "$currentWeek",
    //     },
    //   },
    //   {
    //     $project: {
    //       WSattempted: "$attemptCount",
    //       WScompleted: "$completionCount",
    //     },
    //   },
    // ]);

    // let userArray = [];

    // WSJourneyByMh.map((element) => {
    //   users.map((user) => {
    //     if (String(user._id) === element._id) {
    //       // console.log(user);
    //       userArray.push({
    //         _id: user._id,
    //         WSattempted: element.WSattempted,
    //         WScompleted: element.WScompleted,
    //         childAge: user.newChildAge,
    //         currentWeek: user.currentWeek,
    //       });
    //     }
    //   });
    // });

    // // videos attempt or completed

    // let VSJourney = await mongoose.model("videostatus").aggregate([
    //   { $match: { userId: { $in: usersMh } } },
    //   {
    //     $group: {
    //       _id: "$userId",
    //       attemptCount: { $sum: 1 },
    //       completionCount: {
    //         $sum: { $cond: [{ $eq: ["$watched", true] }, 1, 0] },
    //       },
    //       // childAge: "$childAge",
    //       // currentWeek: "$currentWeek",
    //     },
    //   },
    //   {
    //     $project: {
    //       VDattempted: "$attemptCount",
    //       VDcompleted: "$completionCount",
    //     },
    //   },
    // ]);

    // // // console.log(VSJourney);

    // let VSArray = [];

    // VSJourney.map((element) => {
    //   users.map((user) => {
    //     if (String(user._id) === element._id) {
    //       // console.log(user);
    //       VSArray.push({
    //         _id: user._id,
    //         VDattempted: element.VDattempted,
    //         VDcompleted: element.VDcompleted,
    //         childAge: user.newChildAge,
    //         currentWeek: user.currentWeek,
    //       });
    //     }
    //   });
    // });

    // try to making it in one datat

    // let WSplusVDarray = [];

    // userArray.map((ele) => {
    //   VSArray.map((video) => {
    //     if (ele._id === video._id) {
    //       WSplusVDarray.push({
    //         _id: ele._id,
    //         WSattempted: ele.WSattempted,
    //         WScompleted: ele.WScompleted,
    //         VDattempted: video.VDattempted,
    //         VDcompleted: video.VDcompleted,
    //         childAge: ele.childAge,
    //         currentWeek: ele.currentWeek,
    //       });
    //     }
    //   });
    // });

    // console.log("WSplusVDarray", WSplusVDarray);
    // quiz journey

    // let QZJourney = await mongoose.model("quizjourney").aggregate([
    //   { $match: { userId: { $in: usersMh } } },
    //   {
    //     $group: {
    //       _id: "$userId",
    //       attemptCount: { $sum: { $size: "$attempts" } },
    //     },
    //   },
    //   {
    //     $project: {
    //       TotalQZQuestions: "$attemptCount",
    //     },
    //   },
    // ]);

    // let QZArray = [];

    // QZJourney.map((element) => {
    //   users.map((user) => {
    //     if (String(user._id) === element._id) {
    //       // console.log(user);
    //       QZArray.push({
    //         _id: user._id,
    //         TotalQZQuestions: element.TotalQZQuestions,
    //         childAge: user.newChildAge,
    //         currentWeek: user.currentWeek,
    //       });
    //     }
    //   });
    // });

    // console.log("quiz", QZJourney);

    // adding quiz data to it

    // let WSplusVDplusQZArray = [];

    // WSplusVDarray.map((ele) => {
    //   QZArray.map((quiz) => {
    //     if (ele._id === quiz._id) {
    //       WSplusVDplusQZArray.push({
    //         _id: ele._id,
    //         WSattempted: ele.WSattempted,
    //         WScompleted: ele.WScompleted,
    //         VDattempted: ele.VDattempted,
    //         VDcompleted: ele.VDcompleted,
    //         TotalQZQuestions: quiz.TotalQZQuestions,
    //         childAge: ele.childAge,
    //         currentWeek: ele.currentWeek,
    //       });
    //     }
    //   });
    // });

    // console.log("WSplusVDplusQZArray", WSplusVDplusQZArray);
    //monthly assessment subject wise

    // let sheetIds = await mongoose
    //   .model("sheets")
    //   .find({ assessmentMonth: { $exists: true } });

    // let WSmAssJourney = await mongoose.model("worksheetjourney").find({
    //   $and: [{ userId: { $in: usersMh } }, { sheetId: { $in: sheetIds } }],
    // });

    // // console.log("WSmAssJourney", WSmAssJourney);

    // let assessmentArray = [];

    // users.map((ele) => {
    //   if (ele.currentWeek >= 5 && ele.currentWeek <= 8) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 1,
    //       assessmentEngCompleted: 1,
    //       assessmentHinCompleted: 1,
    //     });
    //   } else if (ele.currentWeek >= 9 && ele.currentWeek <= 12) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 2,
    //       assessmentEngCompleted: 2,
    //       assessmentHinCompleted: 2,
    //     });
    //   } else if (ele.currentWeek >= 13 && ele.currentWeek <= 16) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 3,
    //       assessmentEngCompleted: 3,
    //       assessmentHinCompleted: 3,
    //     });
    //   } else if (ele.currentWeek >= 17 && ele.currentWeek <= 20) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 4,
    //       assessmentEngCompleted: 4,
    //       assessmentHinCompleted: 4,
    //     });
    //   } else if (ele.currentWeek >= 21 && ele.currentWeek <= 24) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 5,
    //       assessmentEngCompleted: 5,
    //       assessmentHinCompleted: 5,
    //     });
    //   } else if (ele.currentWeek >= 25 && ele.currentWeek <= 28) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 6,
    //       assessmentEngCompleted: 6,
    //       assessmentHinCompleted: 6,
    //     });
    //   } else if (ele.currentWeek >= 29 && ele.currentWeek <= 32) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 7,
    //       assessmentEngCompleted: 7,
    //       assessmentHinCompleted: 7,
    //     });
    //   } else if (ele.currentWeek >= 33 && ele.currentWeek <= 36) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 8,
    //       assessmentEngCompleted: 8,
    //       assessmentHinCompleted: 8,
    //     });
    //   } else if (ele.currentWeek >= 37 && ele.currentWeek <= 39) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 9,
    //       assessmentEngCompleted: 9,
    //       assessmentHinCompleted: 9,
    //     });
    //   } else if (ele.currentWeek >= 40 && ele.currentWeek <= 43) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 10,
    //       assessmentEngCompleted: 10,
    //       assessmentHinCompleted: 10,
    //     });
    //   } else if (ele.currentWeek >= 44 && ele.currentWeek <= 47) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 11,
    //       assessmentEngCompleted: 11,
    //       assessmentHinCompleted: 11,
    //     });
    //   } else if (ele.currentWeek >= 48 && ele.currentWeek <= 52) {
    //     assessmentArray.push({
    //       _id: ele._id,
    //       assessmentMathsCompleted: 12,
    //       assessmentEngCompleted: 12,
    //       assessmentHinCompleted: 12,
    //     });
    //   }
    // });

    // let WSVDQZASSArray = [];

    // WSplusVDplusQZArray.map((ele) => {
    //   assessmentArray.map((assessm) => {
    //     if (ele._id === assessm._id) {
    //       WSVDQZASSArray.push({
    //         _id: ele._id,
    //         WSattempted: ele.WSattempted,
    //         WScompleted: ele.WScompleted,
    //         VDattempted: ele.VDattempted,
    //         VDcompleted: ele.VDcompleted,
    //         TotalQZQuestions: ele.TotalQZQuestions,
    //         childAge: ele.childAge,
    //         currentWeek: ele.currentWeek,
    //         assessmentMathsCompleted: assessm.assessmentMathsCompleted,
    //         assessmentEngCompleted: assessm.assessmentEngCompleted,
    //         assessmentHinCompleted: assessm.assessmentHinCompleted,
    //       });
    //     }
    //   });
    // });

    // Updating Action India Users with status as AIS or AIJ in the treatment group

    // const users = await mongoose.model("user").find({});

    // actionIndiaUsers.map((actionUser) => {
    //   // users.map((user) => {
    //   if (actionUser["फ़ोन नंबर"] == "") {

    //     if()

    //   }
    //   // });
    // });

    return res.status(200).json(actionIndiaUsers);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
