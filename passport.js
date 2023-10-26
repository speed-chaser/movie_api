const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * Setting up the local strategy for Passport authentication.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    (username, password, callback) => {
      console.log(username + " " + password);

      /**
       * Finding a single user based on their username.
       */
      Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log("incorrect username");
            return callback(null, false, { message: "Incorrect username." });
          }

          /**
           * Validating the user’s password.
           */
          if (!user.validatePassword(password)) {
            console.log("incorrect password");
            return callback(null, false, { message: "Incorrect password." });
          }

          console.log("finished");
          return callback(null, user);
        })
        .catch((error) => {
          console.log(error);
          return callback(error);
        });
    }
  )
);

/**
 * Setting up the JWT strategy for Passport authentication.
 */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, callback) => {
      /**
       * Finding a single user based on the ID in the JWT payload.
       */
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
