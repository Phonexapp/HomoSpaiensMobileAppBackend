const passport = require("passport");

exports = require("./google");
exports = require("./local");
exports = require("./twitter");
exports = require("./facebook");

passport.serializeUser((user, done) => {
    console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Retrieve the user from the database based on the ID
  // Replace this with your own logic

  const user = { id: id };
  done(null, user);
});
