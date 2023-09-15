var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");

const cron = require("node-cron");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comments");
var authRouter = require("./routes/auth");
var messageRoutes = require("./routes/messages");
var conversationRoutes = require("./routes/conversation");
var storyRoutes = require("./routes/story");
var storyController = require("./controllers/story/ExpiresIn24hrs");
var reelsRoutes = require("./routes/reels");
const connectMongo = require("./connections/mongoose");
const io = require("./services/socketio");
const passport = require("passport");
const { authenticateToken } = require("./services/JWT");
require("./services/auth");
const BusinessAccountSignup=require("./routes/BusinessAccountSignup.js");
const BusinessAccountLogin=require("./routes/BusinessAccountLogin.js");
const BusinessHomeLogin=require("./routes/BusinessLoginHome.js");
const InstituteAccountSignup=require("./routes/InstituteAccountSignup.js");
const InstituteAccountLogin=require("./routes/InstituteAccountLogin.js");
const InstituteHomeLogin=require("./routes/InstituteLoginHome.js");
const uservideo=require("./routes/Video.js");
const uservideolike=require("./routes/uservideolike.js");
const uservideonotlike=require("./routes/uservideonotlike.js");
const FreeDomWriter=require("./routes/FreeDomWriter.js");
const UserOpinion=require("./routes/useropinion.js");
const AmazingReview=require("./routes/UserAmazingReview.js");
const AmazingTopic=require("./routes/AmazingTopic.js");





var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// session configuration
// app.use(
//   require("express-session")({
//     secret: "keyboard cat",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// Connect to database
connectMongo();

app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/userpost", postRoutes);
//Comments need To check while Integration
app.use("/api/v1/comment", commentRoutes);
//MessageRoute Need To Be Check While Integrating
app.use("/api/v1/messages", messageRoutes);
//ConversationRoute Need To Be Check While Integrating
app.use("/api/v1/conversations", authenticateToken, conversationRoutes);
app.use("/api/v1/story", storyRoutes);
app.use("/api/v1/reels", reelsRoutes);
app.use("/api/BusinessSignup", BusinessAccountSignup);
app.use("/api/BusinessLogin", BusinessAccountLogin);
app.use("/api/BusinessHomeLogin", BusinessHomeLogin);
app.use("/api/InstituteSignup", InstituteAccountSignup);
app.use("/api/InstituteLogin", InstituteAccountLogin);
app.use("/api/InstituteHomeLogin", InstituteHomeLogin);
app.use("/api/Video", uservideo);
app.use("/api/LikeDisLike", uservideolike);
// app.use("/api/Dislike", uservideonotlike);
app.use("/api/Writer", FreeDomWriter);
app.use("/api/opinion", UserOpinion);
app.use("/api/Amazing", AmazingReview);
app.use("/api/Amazing", AmazingTopic);



// Schedule task to delete expired stories every 24 hours
cron.schedule("0 0 * * *", () => {
  storyController.deleteExpiredStories();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ ...err, stack: err.stack });
});

module.exports = app;
