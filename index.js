const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//mongoose.connect("mongodb://127.0.0.1:27017/chaseflixDB", {useNewUrlParser: true,useUnifiedTopology: true,});
const Models = require("./models.js");

const Movies = Models.Movie,
  Users = Models.User;

const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");
uuid = require("uuid");

const { check, validationResult } = require("express-validator");

const app = express();

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.log(err);
});

app.use(morgan("common"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const cors = require("cors");
let allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://testsite.com",
  "https://chaseflix-481df0d77a4b.herokuapp.com",
  "https://chaseflix.netlify.app",
];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1234");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

//GET Requests
app.get("/", (req, res) => {
  res.send("Welcome to the movie club!");
});
//Get all movies
app.get(
  "/movies" /*,
  passport.authenticate("jwt", { session: false })*/,
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Get specific movie by Title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

app.get(
  "/movies/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      const movieId = mongoose.Types.ObjectId(req.params._id);
      Movies.findOne({ _id: movieId })
        .then((movie) => {
          if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
          }
          res.json(movie);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error: " + err);
        });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Invalid movie ID" });
    }
  }
);

//Get all movies by specific genre
app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find({ "Genre.Name": req.params.Name })
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => {
        res.status(500).send("Error: " + err);
      });
  }
);

//Get all movies by specific director
app.get(
  "/movies/directors/:Director",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find({ "Director.Name": req.params.Director })
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Get all movies featuring specific actor
/*app.get('/movies/actors/:Actor', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({'Actors.Name': req.params.Actor })
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});*/

//Get specific genre by Name
app.get(
  "/genres/:Genre",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Genre })
      .then((movie) => {
        res.json([movie.Genre.Name, movie.Genre.Description]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Get specific director by Name
app.get(
  "/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then((movie) => {
        res.json([
          movie.Director.Name,
          movie.Director.Bio,
          movie.Director.Born,
          movie.Director.Death,
        ]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Get all Users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Get specific User by Username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//POST requests

//Add new User
app.post("/users", (req, res) => {
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check("Username", "Username contains invalid characters.").isAlphanumeric(),
    check("Password", "Password is required.").not().isEmpty(),
    check("Email", "Invalid Email").isEmail(),
  ],
    (req, res) => {
      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    };

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Add movie to user's FavoriteMovie array
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $addToSet: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).send("Error: User doesn't  exist");
        } else {
          res.json(updatedUser);
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      });
  }
);

//UPDATE requests

//Update User info
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check(
      "Username",
      "Username is required with a minimum of 4 characters"
    ).isLength({ min: 4 }),
    check("Username", "Username contains invalid characters.").isAlphanumeric(),
    check("Password", "Password is required.").not().isEmpty(),
    check("Email", "Invalid Email").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    console.log("Received username parameter:", req.params.Username);
    console.log("Username parameter:", req.params.Username);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        console.log("Updated user:", updatedUser);
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err.message);
      });
  }
);

//DELETE requests

//Delete User
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username }).then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(200).send(req.params.Username + " was succesfully deleted.");
      }
    });
  }
);

//Delete movie from FavoriteMovie array
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      });
  }
);

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
