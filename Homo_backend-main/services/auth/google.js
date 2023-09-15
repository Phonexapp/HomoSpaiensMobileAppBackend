const passport = require("passport");
const GoogleTokenStrategy = require('passport-google-token').Strategy;

passport.use('google-token', new GoogleTokenStrategy({
    clientID: 'your-google-client-id',
    clientSecret: 'your-google-client-secret'
  }, (accessToken, refreshToken, profile, done) => {
    // Handle Google authentication callback
    // Replace this with your own logic
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    };
    return done(null, user);
  }));