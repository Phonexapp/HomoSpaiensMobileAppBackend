const passport = require("passport");
const FacebookTokenStrategy = require('passport-facebook-token');

passport.use('facebook-token', new FacebookTokenStrategy({
    clientID: 'your-facebook-app-id',
    clientSecret: 'your-facebook-app-secret'
  }, (accessToken, refreshToken, profile, done) => {
    // Handle Facebook authentication callback
    // Replace this with your own logic
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    };
    return done(null, user);
  }));