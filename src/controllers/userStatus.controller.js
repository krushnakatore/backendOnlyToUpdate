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

const moment = require("moment");

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

    // journey.forEach(async (ele) => {
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

    // //6. update attempted and completed status in userstatus for each subjects of user
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
    //    break;
    //     case "English": {
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
    //                 totalEnglishWorksheetsAttempted: ele.attempted,
    //                 totalEnglishWorksheetsCompleted: ele.completed,
    //               },
    //             }
    //           );
    //       });
    //     }
    //     break;
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

    //   // console.log(`${video}`, videoJourneyAttempted);

    //   // //5. Find this Maths,English and Hindi sheets in user and update

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
    //         console.log(ele, value);
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
    //                   totalChildVidStart: ele.attempted,
    //                   totalChildVidCompleted: ele.completed,
    //                 },
    //               }
    //             );
    //         });
    //       }
    //       break;
    //     case "Parent":
    //       {
    //         let value = await videoWiseUpdate(ele);
    //         console.log(ele, value);
    //         // value.forEach(async (ele) => {
    //         //   let newId = mongoose.Types.ObjectId(ele._id);
    //         //   let updateAttemptedWSdata = await mongoose
    //         //     .model("userstatus")
    //         //     .findOneAndUpdate(
    //         //       {
    //         //         _id: newId,
    //         //       },

    //         //       {
    //         //         $set: {
    //         //           totalParentVidStart: ele.attempted,
    //         //           totalParentVidCompleted: ele.completed,
    //         //         },
    //         //       }
    //         //     );
    //         // });
    //       }
    //       break;
    //     case "View and do":
    //       {
    //         let value = await videoWiseUpdate(ele);
    //         console.log(ele, value);
    //         // value.forEach(async (ele) => {
    //         //   let newId = mongoose.Types.ObjectId(ele._id);
    //         //   let updateAttemptedWSdata = await mongoose
    //         //     .model("userstatus")
    //         //     .findOneAndUpdate(
    //         //       {
    //         //         _id: newId,
    //         //       },

    //         //       {
    //         //         $set: {
    //         //           totalViewAndDoVidStart: ele.attempted,
    //         //           totalViewAndDoVidCompleted: ele.completed,
    //         //         },
    //         //       }
    //         //     );
    //         // });
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

    //         // videosJourney.forEach(async (ele) => {
    //         //   let newId = mongoose.Types.ObjectId(ele._id);
    //         //   let updateAttemptedWSdata = await mongoose
    //         //     .model("userstatus")
    //         //     .findOneAndUpdate(
    //         //       {
    //         //         _id: newId,
    //         //       },

    //         //       {
    //         //         $set: {
    //         //           totalVideosStart: ele.attempted,
    //         //           totalVideosCompleted: ele.completed,
    //         //         },
    //         //       }
    //         //     );
    //         // });
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

    let WSData = await mongoose.model("worksheetjourney").find({});

    let userDataAttempted = {};
    let userDataAttempted1 = {};

    let WSdata = WSData.map((wJourney) => {
      if (userDataAttempted[wJourney.userId] === undefined) {
        //   //calculate attempt and add it to userAttempts
        const attempt = wJourney.journey ? wJourney.journey.length : 0;
        //   // if attempt then check completion
        const completion = attempt
          ? wJourney.journey.reduce((acc, k) => {
              acc = k.score ? acc++ : acc;
              return acc;
            }, 0)
          : 0;
        userDataAttempted[wJourney.userId] = attempt || 0;
        userDataCompleted[wJourney.userId] = completion || 0;
      } else {
        const attempt = wJourney.journey ? wJourney.journey.length : 0;
        // if attempt then check completion
        const completion = attempt
          ? wJourney.journey.reduce((acc, k) => {
              acc = k.score ? acc++ : acc;
              return acc;
            }, 0)
          : 0;
        userDataAttempted[wJourney.userId] += attempt;
        userDataCompleted[wJourney.userId] += completion;
      }
    });

    //

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

    // console.log("end of date", today);

    // const dateObj = { $gte: startDate };

    // // video watched, WS completed or Quiz Completed

    // // 1. Video watched

    // let VideoWatched = await mongoose.model("videostatus").aggregate([
    //   {
    //     $match: {
    //       userId: { $in: userNotUninstalled },
    //       updatedAt: { ...dateObj },
    //     },
    //   },
    //   {
    //     $project: {
    //       userId: "$userId",
    //     },
    //   },
    // ]);

    // let VDarray = [];

    // VideoWatched.forEach((ele) => {
    //   VDarray.push(ele.userId);
    // });

    // // console.log(VDCompleted);
    // //2.WS completed

    // let WSCompleted = await mongoose.model("worksheetjourney").aggregate([
    //   {
    //     $match: {
    //       userId: { $in: userNotUninstalled },
    //       updatedAt: { ...dateObj },
    //     },
    //   },

    //   {
    //     $project: {
    //       userId: "$userId",
    //     },
    //   },
    // ]);

    // let WSarray = [];

    // WSCompleted.forEach((ele) => {
    //   WSarray.push(ele.userId);
    // });

    // // console.log(WSarray);

    // //3.Quiz completed

    // let QZCompleted = await mongoose.model("quizjourney").aggregate([
    //   {
    //     $match: {
    //       userId: { $in: userNotUninstalled },
    //       updatedAt: { ...dateObj },
    //       // completed: true,
    //     },
    //   },
    //   {
    //     $project: {
    //       userId: "$userId",
    //     },
    //   },
    // ]);

    // let QZarray = [];

    // QZCompleted.forEach((ele) => {
    //   QZarray.push(ele.userId);
    // });

    // let data = [...QZarray, ...WSarray, ...VDarray];

    // let dataObj = {};

    // data.forEach((ele) => {
    //   if (dataObj[ele] === undefined) {
    //     dataObj[ele] = 1;
    //   }
    // });

    // console.log("data", Object.keys(dataObj).length);

    // console.log("QZCompleted", data.length);

    // check the data for sorting...

    return res.status(200).json({ userDataAttempted1, userDataCompleted1 });
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
