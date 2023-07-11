const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chaseflixDB', { useNewUrlParser: true, useUnifiedTopology: true });
const Models = require('./models.js');

const Movies = Models.Movie,
    Users = Models.User;


const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser')
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.log(err);
});

app.use(morgan('common'));

app.use(bodyParser.urlencoded({
    extended: true
}));
<<<<<<< Updated upstream
=======

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');
>>>>>>> Stashed changes


//GET Requests

//Get all movies
app.get('/movies', (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

//Get specific movie by Title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


//Get all movies by specific genre
app.get('/movies/genres/:Name', passport.authenticate('jwt', { session: false }),(req, res) => {
    Movies.find({ 'Genre.Name': req.params.Name })
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => {
        res.status(500).send('Error: ' + err);
    });
});

//Get all movies by specific director
app.get('/movies/directors/:Director', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({'Director.Name': req.params.Director })
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

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
app.get('/genres/:Genre', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({'Genre.Name': req.params.Genre })
        .then((movie) => {
            res.json([movie.Genre.Name, movie.Genre.Description]);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get specific director by Name
app.get('/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({'Director.Name': req.params.Name })
        .then((movie) => {
            res.json([
                movie.Director.Name, 
                movie.Director.Bio, 
                movie.Director.Born, 
                movie.Director.Death,
                [movie.Director.Movies]
            ]);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get all Users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  //Get specific User by Username
  app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({Username: req.params.Username})
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


//POST requests

//Add new User
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

  //Add movie to user's FavoriteMovie array
  app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, 
        { $push: { FavoriteMovies: req.params.MovieID }
        },
        { new: true } 
    )
    .then(updatedUser => {
        res.json(updatedUser);
    })
        .catch(err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
  });

  //UPDATE requests

  //Update User info
  app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true } )
    .then(updatedUser => {
        res.json(updatedUser);
    })
        .catch(err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
  });

  //DELETE requests

  //Delete User
  app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username} )
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found.');
            } else {
                res.status(200).send(req.params.Username + ' was succesfully deleted.');
            }
        });
  });

  //Delete movie from FavoriteMovie array
  app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, 
        { $pull: {FavoriteMovies: req.params.MovieID}},
        { new: true }
    )
    .then(updatedUser => {
        res.json(updatedUser);
    })
        .catch(err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
  });

// listen for requests
app.listen(8080, () => {
    console.log('ChaseFlix is listening on port 8080.')
});


