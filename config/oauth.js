const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: process.env.OAUTH_AUTH_URL,
      tokenURL: process.env.OAUTH_TOKEN_URL,
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {


      return done(null, profile);
    }
  )
);

module.exports = passport;