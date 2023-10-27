# 🎬 Chaseflix API

Chaseflix API is a robust, user-friendly RESTful API built using Node.js and Express. It provides users with a wide array of movie-related information, enabling them to access details about movies, genres, directors, and actors effortlessly. Tailored to meet all your movie data requirements, Chaseflix API ensures a rich, secure, and extensive suite of features for seamless access to comprehensive movie details.

## 🌟 Essential Features

- **List of All Movies**: Retrieve a complete list of all movies available in the database.
- **Single Movie Details**: Access extensive information about a single movie, including its description, genre, director, image URL, and its featured status.
- **Genre Details**: Explore detailed descriptions of various movie genres.
- **Director Details**: Access comprehensive details about directors, including bios, birth years, and years of passing.
- **User Registration and Management**:
   - Enable new users to register.
   - Allow users to update their personal information such as username, password, email, and date of birth.
   - Users can add or remove movies from their list of favorites.
   - Allow existing users to deregister.

## 🚀 Optional Features

- **Actor Details**: Users can view which actors starred in which movies, and access information about different actors.
- **Extended Movie Details**: Users can view additional movie information such as release dates and ratings.
- **User Lists**:
   - Allow users to create a "To Watch" list in addition to their "Favorite Movies" list.

## 🔧 Technical Implementations

- Developed using Node.js and Express, following REST architecture principles.
- Utilizes middleware modules such as body-parser for reading data from requests and morgan for logging.
- Built with MongoDB, leveraging Mongoose for business logic modeling.
- Provides movie information in a consumable JSON format, ensuring seamless integration and usage.
- Includes user authentication and authorization code for enhanced security.
- Incorporates data validation logic, ensuring integrity and reliability.
- Meets rigorous data security regulations, promising safe and secure access to movie data.
- Tested meticulously using Postman, guaranteeing a bug-free, reliable API experience.
- The source code is publicly accessible, hosted on GitHub, promoting transparency and collaboration.

## Installation

### 1. **Clone the Repository***

   ```bash
   git clone https://github.com/speed-chaser/Chaseflix-API.git
   cd Chaseflix-API
   ```

### 2. **Install Dependencies**

Make sure you have Node.js and npm installed. Run the following command inside the project directory.

   ```bash
   npm install
   ```
### 3. **Set up Environment Variables**

Create a `.env` file in the root of your project directory and populate it with the necessary environment variables such as:

   ```bash
   MONGO_DB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

### 4. **Run the Application**

   ```bash
   npm start
   ```
or
   ```bash
   node index.js
   ```
**NOTE** it is important that you change the commented out code here in `index.js` depending on if you are testing locally or not:

   ```bash
   /**
 * Connecting to MongoDB.
 */
//For deployed project
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//For testing locally
/*mongoose.connect("mongodb://127.0.0.1:27017/chaseflixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});*/
```

### 5. Testing the API

Utilize Postman or any other API testing tool to test the endpoints and ensure that they are working as expected.
