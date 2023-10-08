const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
    Born: Date,
    Death: Date,
    Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  Actors: [
    {
      Name: String,
      Bio: String,
      Born: Date,
      Death: Date,
    },
  ],
  ImagePath: String,
  Featured: Boolean,
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  Bio: { type: String, required: false, default: "This is my bio." },
  ProfilePic: {
    type: String,
    required: true,
    default: "https://chaseflix-bucket.s3.amazonaws.com/avatar-default.png",
  },
  Verified: { type: Boolean, required: true, default: false },
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  Followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      default: [],
    },
  ],
  Following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      default: [],
    },
  ],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
