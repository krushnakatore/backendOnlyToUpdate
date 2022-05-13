const express = require("express");

const mongoose = require("mongoose");

const UserStatus = require("../models/userStatus.model");

const Sheets = require("../models/sheets.model");

const WorksheetJourney = require("../models/worksheetJourney.model");

const newVideo = require("../models/newVideo.model");

const videosStatus = require("../models/videoStatus.model");

const User = require("../models/user.model");

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

    let videosWatched = ["", "Child", "Parent", "View and do"];

    async function videoWiseUpdate(video) {
      // console.log(subject, subjectAttmpt, subjectComp);
      let videoJourneyAttempted;

      videoJourneyAttempted = await modelUpdate("newvideo", {
        tab: `${video}`,
      });

      videoJourneyAttempted = videoJourneyAttempted.map((videoId) =>
        String(videoId)
      );

      // console.log(`${video}`, videoJourneyAttempted);

      // //5. Find this Maths,English and Hindi sheets in user and update

      let videosJourney = await mongoose.model("videostatus").aggregate([
        {
          $match: {
            userId: { $in: userNotUninstalled },
            videoId: { $in: videoJourneyAttempted },
          },
        },
        {
          $group: {
            _id: "$userId",
            attemptCount: { $sum: 1 },
            completionCount: {
              $sum: { $cond: [{ $eq: ["$watched", true] }, 1, 0] },
            },
          },
        },
        {
          $project: {
            attempted: "$attemptCount",
            completed: "$completionCount",
          },
        },
      ]);

      return videosJourney;
    }

    videosWatched.forEach(async (ele) => {
      switch (ele) {
        case "Child":
          {
            let value = await videoWiseUpdate(ele);
            console.log(ele, value);
            value.forEach(async (ele) => {
              let newId = mongoose.Types.ObjectId(ele._id);
              let updateAttemptedWSdata = await mongoose
                .model("userstatus")
                .findOneAndUpdate(
                  {
                    _id: newId,
                  },

                  {
                    $set: {
                      totalChildVidStart: ele.attempted,
                      totalChildVidCompleted: ele.completed,
                    },
                  }
                );
            });
          }
          break;
        case "Parent":
          {
            let value = await videoWiseUpdate(ele);
            console.log(ele, value);
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
          }
          break;
        case "View and do":
          {
            let value = await videoWiseUpdate(ele);
            console.log(ele, value);
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
          }
          break;
        case "":
          {
            let videoJourneyAttempted = await modelUpdate("newvideo");

            videoJourneyAttempted = videoJourneyAttempted.map((videoId) =>
              String(videoId)
            );

            let videosJourney = await mongoose.model("videostatus").aggregate([
              {
                $match: {
                  userId: { $in: userNotUninstalled },
                  // videoId: { $in: videoJourneyAttempted },
                },
              },
              {
                $group: {
                  _id: "$userId",
                  attemptCount: { $sum: 1 },
                  completionCount: {
                    $sum: { $cond: [{ $eq: ["$watched", true] }, 1, 0] },
                  },
                },
              },
              {
                $project: {
                  attempted: "$attemptCount",
                  completed: "$completionCount",
                },
              },
            ]);

            console.log("videosJourney", videosJourney);

            // videosJourney.forEach(async (ele) => {
            //   let newId = mongoose.Types.ObjectId(ele._id);
            //   let updateAttemptedWSdata = await mongoose
            //     .model("userstatus")
            //     .findOneAndUpdate(
            //       {
            //         _id: newId,
            //       },

            //       {
            //         $set: {
            //           totalVideosStart: ele.attempted,
            //           totalVideosCompleted: ele.completed,
            //         },
            //       }
            //     );
            // });
          }
          break;
      }
    });

    return res.status(200).send(true);
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
});

module.exports = router;
