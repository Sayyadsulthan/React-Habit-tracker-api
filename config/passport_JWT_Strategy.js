const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../model/user");
const key = "codeial";

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: key,
};

passport.use(
  new JWTStrategy(opts, function (jwt_payload, done) {
    console.log("payload : ", jwt_payload);
    User.findById(jwt_payload._id)
      //using primises to get user
      .then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })

      .catch((err) => {
        console.log("**** err infinding user from jwt: ", err);
        return done(err, false);
      });
  })
);

module.exports = passport;
