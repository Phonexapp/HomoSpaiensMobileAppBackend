const mongoose = require("mongoose");

let VideoSchema = new mongoose.Schema({
    UserID: { type: mongoose.Types.ObjectId, refpath: "model_type" },
    Thumbnail: { type:  String, refpath: "model_type" },
    Title: { type:  String, refpath: "model_type" },
    Description: { type:  String, refpath: "model_type" },
    Subtitle: { type:  String, refpath: "model_type" },
    Date: { type: String },
    Time: { type:String },
    video: { type:  String, refpath: "model_type" },
    like: [{ type:[ mongoose.Types.ObjectId], refpath: "model_type" }],
    Dislike: [{ type:[ mongoose.Types.ObjectId], refpath: "model_type" }],
    model_type: { type: String, enum: ["users", "Business", "Institute"] }
})

let videomodel = mongoose.model("videos", VideoSchema);

module.exports = videomodel;