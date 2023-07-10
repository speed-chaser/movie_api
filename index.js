const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chaseflixDB', { useNewUrlParser: true, useUnifiedTopology: true });
const Models = require('./models.js');

const Movies = Models.Movie,
    Genres = Models.Genre,
    Directors = Models.Director,
    Actors = Models.Actor,
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
app.get('/movies/:Title', (req, res) => {
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
app.get('/movies/genres/:Genre', (req, res) => {
    Movies.find({Genre: req.params.Genre })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get all movies by specific director
app.get('/movies/directors/:Director', (req, res) => {
    Movies.find({Director: req.params.Director })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get all movies featuring specific actor
app.get('/movies/actors/:Actor', (req, res) => {
    Movies.find({Actors: req.params.Actor })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get all genres
app.get('/genres', (req, res) => {
    Genres.find()
      .then((genres) => {
        res.status(201).json(genres);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

//Get specific genre by Name
app.get('/genres/:Name', (req, res) => {
    Genres.findOne({Name: req.params.Name })
        .then((genre) => {
            res.json(genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get all directors
app.get('/directors', (req, res) => {
    Directors.find()
      .then((directors) => {
        res.status(201).json(directors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

//Get specific director by Name
app.get('/directors/:Name', (req, res) => {
    Directors.findOne({Name: req.params.Name })
        .then((director) => {
            res.json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get all actors
app.get('/actors', (req, res) => {
    Actors.find()
      .then((actors) => {
        res.status(201).json(actors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

//Get specific actor by Name
app.get('/actors/:Name', (req, res) => {
    Actors.findOne({Name: req.params.Name })
        .then((actor) => {
            res.json(actor);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


//Get all Users
app.get('/users', (req, res) => {
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
  app.get('/users/:Username', (req, res) => {
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
  app.post('/users/:Username/movies/:MovieID', (req, res) => {
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
  app.put('/users/:Username', (req, res) => {
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
  app.delete('/users/:Username', (req, res) => {
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
  app.delete('/users/:Username/movies/:MovieID', (req, res) => {
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


