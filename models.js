const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
    Director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director'},
    Actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor'}],
    ImagePath: String,
    Featured: Boolean
});

let directorSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Born: {type: Date, required: true},
    Death: Date,
    Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let genreSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true}
});

let actorSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Born: {type: Date, required: true},
    Death: Date,
    Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    Verified: Boolean,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let Movie = mongoose.model('Movie', movieSchema);
let Director = mongoose.model('Director', directorSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Actor = mongoose.model('Actor', actorSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.Director = Director;
module.exports.Genre = Genre;
module.exports.Actor = Actor;
module.exports.User = User;