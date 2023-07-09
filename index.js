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

/*let movies = [
    {
        movieId:'',
        title: 'Good Will Hunting',
        description: 'Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.',
        GenreID: '1',
        DirectorID: '1',
        movieImgUrl: 'goodwillhunting.png',
        featured: 'Y'
    },
    {
        movieId: '',
        title: 'The Social Network',
        description: 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea and by the co-founder who was later squeezed out of the business.',
        GenreID: '1',
        DirectorID: '2',
        movieImgUrl: 'thesocialnetwork.png',
        featured: 'Y'
    },
    {
        movieId: '',
        title: 'Django: Unchained',
        description: 'With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.',
        GenreID: '2',
        DirectorID: '3',
        movieImgUrl: '',
        featured: 'N'
    },
    {
        movieId: '',
        title: 'Scott Pilgrim vs. the World',
        description: 'In a magically realistic version of Toronto, a young man must defeat his new girlfriend\'s seven evil exes one by one in order to win her heart.',
        GenreID: '3',
        DirectorID: '4',
        movieImgUrl: '',
        featured: 'N'
    },
    {
        movieId: '',
        title: 'Back to the Future',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        GenreID: '4',
        DirectorID: '5',
        movieImgUrl: '',
        featured: 'N'
    },
    {
        movieId: '',
        title: 'Bottle Rocket',
        description: 'Three friends plan to pull off a simple robbery and go on the run.',
        genre: ['Comedy','Drama','Crime'],
        DirectorID: '6',
        movieImgUrl: '',
        featured: 'N'
    },
    {
        movieId: '',
        title: 'True Romance',
        description: 'In Detroit, a lonely pop culture geek marries a call girl, steals cocaine from her pimp, and tries to sell it in Hollywood. Meanwhile, the owners of the cocaine, the Mob, track them down in an attempt to reclaim it.',
        GenreID: '6',
        DirectorID: '7',
        movieImgUrl: '',
        featured: 'N'
    },
    {
        movieId: '',
        title: 'Dead Poets Society',
        description: 'Maverick teacher John Keating uses poetry to embolden his boarding school students to new heights of self-expression.',
        GenreID: '1',
        DirectorID: '8',
        movieImgUrl: '',
        featured: 'N'
    },
    {
        movieId: '',
        title: 'Interstellar',
        description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
        GenreID: '4',
        DirectorID: '9',
        movieImgUrl: '',
        featured: 'N'
    },
    {
        movieId: '',
        title: 'Catch Me If You Can',
        description: 'Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.',
        GenreID: '6',
        DirectorID: '10',
        movieImgUrl: '',
        featured: 'N'
    }
];

let directors = [
    {
        DirectorID: '1',
        name: 'Gus Van Sant',
        birthYear: 1952,
        bio: 'Gus Green Van Sant Jr. is an American film director, producer, photographer, and musician. He has earned acclaim as both an independent and mainstream filmmaker. His films typically deal with themes of marginalized subcultures, in particular homosexuality.'
    },
    {
        DirectorID: '2',
        name: 'David Fincher',
        birthYear: 1962,
        bio: 'David Andrew Leo Fincher is an American filmmaker. His films, most of which are psychological thrillers, have collectively grossed over $2.1 billion worldwide and have received 10 Academy Award nominations; this includes three Best Director nominations for him.'
    },
    {
        DirectorID: '3',
        name: 'Quentin Tarantino',
        birthYear: 1963,
        bio: 'Quentin Jerome Tarantino is an American film director, writer, producer, and actor. His films are characterized by stylized violence, extended dialogue including a pervasive use of profanity, and references to popular culture.'
    },
    {
        DirectorID: '4',
        name: 'Edgar Wright',
        birthYear: 1974,
        bio: 'Edgar Howard Wright is an English filmmaker. He is known for his fast-paced and kinetic, satirical genre films, which feature extensive utilisation of expressive popular music, Steadicam tracking shots, dolly zooms and a signature editing style that includes transitions, whip pans and wipes.'
    },
    {
        DirectorID: '5',
        name: 'Robert Zemeckis',
        birthYear: '1952',
        bio: 'Robert Lee Zemeckis is an American filmmaker. He first came to public attention as the director of the action-adventure romantic comedy Romancing the Stone, the science-fiction comedy Back to the Future film trilogy, and the live-action/animated comedy Who Framed Roger Rabbit.'
    },
    {
        DirectorID: '6',
        name: 'Wes Anderson',
        birthYear: 1969,
        bio: 'Wesley Wales Anderson is an American filmmaker. His films are known for their eccentricity, unique visual and narrative styles, and frequent use of ensemble casts. They often contain themes of grief, loss of innocence, and dysfunctional families. Anderson is cited by some critics as a modern-day example of an auteur.'
    },
    {
        DirectorID: '7',
        name: 'Tony Scott',
        birthYear: 1944,
        bio: 'Anthony David Leighton Scott was an English film director and producer. He was known for directing highly successful action\
        and thriller films such as Top Gun, Beverly Hills Cop II, Days of Thunder, The Last Boy Scout, True Romance, Crimson Tide, Enemy\
        of the State, Man on Fire, Déjà Vu, and Unstoppable.'
    },
    {
        DirectorID: '8',
        name: 'Peter Weir',
        birthYear: 1944,
        bio: 'Peter Lindsay Weir AM is a retired Australian film director. He is known for directing films crossing various genres over\
         forty years with films such as Picnic at Hanging Rock, Gallipoli, Witness, Dead Poets Society, Fearless, The Truman Show, Master\
          and Commander: The Far Side of the World, and The Way Back.'
    },
    {
        DirectorID: '9',
        name: 'Christopher Nolan',
        birthYear: 1970,
        bio: 'Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling,\
         Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide.'
    },
    {
        DirectorID: '10',
        name: 'Steven Spielberg',
        birthYear: 1946,
        bio: 'Steven Allan Spielberg KBE is an American filmmaker. A major figure of the New Hollywood era and pioneer of the modern blockbuster,\
         he is the most commercially successful director in history'
    },
];

let users = [
    {
        id: '1',
        username: 'Chase',
        password: 'admin',
        email: 'chase@chaseflix.com',
        birthday: '09-07-1996',
        favorites: []
    },
    {
        id: '2',
        username: 'Mace',
        email: 'mace@gmail.com',
        password: 'test222',
        birthday: '09-09-1998',
        favorites: [],
    }
];*/


// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to the movie club!');
});

app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => 
    { return movie.title === req.params.title }));
});

app.get('/movies/genres/:genre', (req, res) => {
    res.send('Successful GET request returning data on specified genres');
});

app.get('/movies/directors/:name', (req, res) => {
    const directorName = req.params.name;
    console.log(directorName); //check to make sure director name is what you'd expect from the params
    res.json(movies.find((movie) => movie.director.name === directorName ));
});

app.get('/users/:username', (req, res) => {
    res.json(users.find((user) => 
    { return user.username === req.params.username }));
});

//single by id may or may not implement later? Seems better than using usernames for everything... What if someone changes their username?
//this seems better so might implement eventually
app.get('/movies/:id', (req, res) => {
    res.json(movies.find((movie) => 
    { return movie.id === req.params.id }));
});

app.get('/users/:id', (req, res) => {
    res.json(users.find((user) => 
    { return user.id === req.params.id }));
});

/*app.post('/movies', (req, res) => {
    let newMovie = req.body;

    if(!newMovie.title) {
        const message = 'Missing title in request body';
        res.status(400).send(message);
    } else {
        newMovie.id = uuid.v4();
        movies.push(newMovie);
        res.status(201).send(newMovie);
    }
});*/

//POST requests
app.post('/users', (req, res) => {
    let newUser = req.body;

    if(!newUser.username || !newUser.email || !newUser.password) {
        const message = 'Missing required fields in body. New users must choose a username/password and also use a valid email address.';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        newUser.favorites = [];
        users.push(newUser);
        res.status(201).send(newUser);
    }
});
app.post('/users/:username/:title', (req, res) => {
    res.send('Successful POST request adding movies to a user\'s favorite list');
});

//PUT requests
app.put('/users/:username', (req, res) => {
    /*const username = req.params.username;
    let newUsername = req.body;

    if(!newUsername.username) {
        const message = 'Your username has not changed.';
        res.status(400).send(message);
    } else {
        users.username.put(newUsername);
        res.status(201).send(newUsername);
    }*/
    res.send('Successful PUT request for new username');
});


//DELETE requests
app.delete('/users/:username', (req, res) =>{
    let user = users.find((user) => { return user.username === req.params.username });

    if (user) {
        users = users.filter((obj) => { return obj.username !== req.params.username });
        res.status(201).send('User: ' + req.params.username + ' was deleted.');
    }
});

app.delete('/users/:username/:title', (req, res) => {
    res.send('Successful DELETE request, deleting a movie from user\'s favorites list');
})



// listen for requests
app.listen(8080, () => {
    console.log('ChaseFlix is listening on port 8080.')
});


