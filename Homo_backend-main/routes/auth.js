const passport = require("passport");
var express = require("express");
const { OAuth } = require("oauth");
const register = require("../controllers/auth/register");
const multer = require("multer");
const forgetPassword = require("../controllers/auth/forgetPassword");
const resetPassword = require("../controllers/auth/resetPassword");
const fs = require("fs");

var router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let pathName = "public/uploads/avatar";
    fs.mkdirSync(pathName, { recursive: true });
    cb(null, pathName);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/facebook",
  passport.authenticate("facebook-token", { session: false }),
  (req, res) => {
    // If authentication succeeds, the user object will be available as `req.user`
    res.json({
      success: true,
      message: "Facebook authentication successful",
      user: req.user,
    });
  }
);

// Endpoint to verify user credentials using Google token
router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  (req, res) => {
    // If authentication succeeds, the user object will be available as `req.user`
    res.json({
      success: true,
      message: "Google authentication successful",
      user: req.user,
    });
  }
);

// Endpoint to verify user credentials using Twitter
router.post("/twitter", (req, res) => {
  const oauth = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "your-twitter-consumer-key",
    "your-twitter-consumer-secret",
    "1.0A",
    null,
    "HMAC-SHA1"
  );

  oauth.getOAuthAccessToken(
    req.body.oauth_token,
    req.body.oauth_token_secret,
    req.body.oauth_verifier,
    (error, accessToken, accessTokenSecret, results) => {
      if (error) {
        console.error("Error:", error);
        return res.json({
          success: false,
          message: "Twitter authentication failed",
        });
      }

      // Retrieve user profile using the obtained access token and access token secret
      oauth.get(
        "https://api.twitter.com/1.1/account/verify_credentials.json",
        accessToken,
        accessTokenSecret,
        (error, data) => {
          if (error) {
            console.error("Error:", error);
            return res.json({
              success: false,
              message: "Twitter authentication failed",
            });
          }

          const profile = JSON.parse(data);

          // Handle Twitter authentication callback
          // Replace this with your own logic
          const user = {
            id: profile.id,
            name: profile.name,
            username: profile.screen_name,
          };

          res.json({
            success: true,
            message: "Twitter authentication successful",
            user,
          });
        }
      );
    }
  );
});

// Endpoint to verify user credentials using local strategy
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    // If authentication succeeds, the user object will be available as req.user
    console.log(req.user);
    res.json({
      success: true,
      message: "Local authentication successful",
      ...req.user,
    });
  }
);
router.post("/register", upload.single("avatar"), register);
router.post("/password/forget", forgetPassword);
router.post("/password/reset", resetPassword);

module.exports = router;
