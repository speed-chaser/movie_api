require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport");

/**
 * Generates a JSON Web Token for authenticated users.
 * @function
 * @param {Object} user - The user for whom the token is generated.
 * @returns {string} - Returns a JSON Web Token.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

/**
 * Handles user login by authenticating the user and generating a JWT token for successful authentications.
 * @module
 * @param {Object} router - The router object to define routes.
 */
module.exports = (router) => {
  /**
   * POST request to login a user.
   * @function
   * @name post/login
   * @param {string} path - Express path.
   * @param {callback} middleware - Express middleware.
   */
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        console.log(error);
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
