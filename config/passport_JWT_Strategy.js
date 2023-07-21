const passport = require("passport");
const JWT_Strategy = require("passport-jwt").Strategy;
const Extract_JWt = require("passport-jwt").ExtractJwt;

const User = require("../model/user");

var opt = {
  jwtFromRequest: Extract_JWt.fromAuthHeaderAsBearerToken(),
  secretKey: "PassportJwt",
};

passport.use(
  new JWT_Strategy(opt, function (jwt_payload, done) {
    User.findById(jwt_payload.id)
      .then((user) => {
        if (user) {
          console.log("user found from db using jwt : ", user);
          return done(null, user);
        }
        console.log("User not found from db using jwt");
        return done(null, false);
      })

      .catch((err) => done(err, false));
  })
);

module.exports = passport;
