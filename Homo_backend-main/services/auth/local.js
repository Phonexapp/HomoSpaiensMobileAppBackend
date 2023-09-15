const passport = require("passport");
const Users = require("../../models/Users");
const { generateAccessToken, generateRefreshToken } = require("../JWT");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    // Handle local authentication
    // Replace this with your own logic
    console.log(username, password);
    try {
      const user = await Users.findOne({ email: username });
      if(!user){
        return done({ message: "User doesn't exist", status: 401 }, null);
      }
// salt
// "$2a$10$XgloDFErtWQucycC8WWy9O"
// hash
// "$2a$10$XgloDFErtWQucycC8WWy9OB7YD1Jj2q88/UaA6bIrcdX5xVBaTl1W"
// user.setPassword(password)
// await user.save()
      if (user.validPassword(password)) {
        const id = user.toJSON()._id;
        const accessToken = generateAccessToken({ id });
        const refreshToken = generateRefreshToken({ id });
        return done(null, {
          // ...user.toJSON(),
          id: user._id,
          accessToken,
          refreshToken,
        });
      } else {
        return done({ message: "Incorrect password", status: 401 }, null, {
          message: "Incorrect password",
        });
      }
    } catch (err) {
      console.log(err);
      return done(err, null, { message: err.message });
    }
  })
);
