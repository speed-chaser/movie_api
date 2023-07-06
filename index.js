const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
console.log('boop');
});

app.use(morgan('common'));

app.use(bodyParser.urlencoded({
    extended: true
}));

let movies = [
    {
        id: 1,
        title: 'Good Will Hunting',
        genre: ['Romance','Drama','Indie'],
        director: {
            name: 'Gus Van Sant'
        }

    },
    {
        id: 2,
        title: 'The Social Network',
        genre: ['Drama','Historical Drama', 'Historical Fiction'],
        director: {
            name: 'David Fincher'
        }
    },
    {
        id: 3,
        title: 'Django: Unchained',
        genre: ['Western','Action','Adventure'],
        director: {
            name: 'Quentin Tarantino'
        }
    },
    {
        id: 4,
        title: 'Scott Pilgrim vs. the World',
        genre: ['Comedy','Action','Romance'],
        director: {
            name: 'Edgar Wright'
        }
    },
    {
        id: 5,
        title: 'Back to the Future',
        genre: ['Sci-Fi','Comedy','Adventure'],
        director: {
            name: 'Robert Zemeckis'
        }
    },
    {
        id: 6,
        title: 'Bottle Rocket',
        genre: ['Comedy','Drama','Crime'],
        director: {
            name: 'Wes Anderson'
        }
    },
    {
        id: 7,
        title: 'True Romance',
        genre: ['Romance','Drama','Crime'],
        director: {
            name: 'Tony Scott'
        }
    },
    {
        id: 8,
        title: 'Dead Poets Society',
        genre: ['Comedy','Teen','Drama'],
        director: {
            name: 'Peter Weir'
        }
    },
    {
        id: 9,
        title: 'Interstellar',
        genre: ['Sci-Fi','Drama','Adventure'],
        director: {
            name: 'Christopher Nolan'
        }
    },
    {
        id: 10,
        title: 'Catch Me If You Can',
        genre: ['Comedy','Crime','Drama'],
        director: 'Steven Spielberg'
    }

];

let users = [
    {
        id: 1,
        username: 'Chase',
        favorites: []
    },
    {
        id: 2,
        username: 'Mace',
        favorites: [],
    }
];


// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to the movie club!');
});

app.get('/documentation', (req, res) => {
    app.use(express.static('public'));
});

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.get('/movies/directors/', (req, res) => {
    res.json(movies.director);
});


app.get('/users', (req, res) => {
    res.json(users);
});

//single by name
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => 
    { return movie.title === req.params.title }));
});

app.get('/movies/directors/:name', (req, res) => {
    res.json(movies.find((director) => 
    { return director.name === req.params.name }));
});

app.get('/users/:username', (req, res) => {
    res.json(users.find((user) => 
    { return user.username === req.params.username }));
});

//single by id
app.get('/movies/:id', (req, res) => {
    res.json(movies.find((movie) => 
    { return movie.id === req.params.id }));
});

app.get('/users/:id', (req, res) => {
    res.json(users.find((user) => 
    { return user.id === req.params.id }));
});

app.post('/movies', (req, res) => {
    let newMovie = req.body;

    if(!newMovie.title) {
        const message = 'Missing title in request body';
        res.status(400).send(message);
    } else {
        newMovie.id = uuid.v4();
        movies.push(newMovie);
        res.status(201).send(newMovie);
    }
});

app.post('/users', (req, res) => {
    let newUser = req.body;

    if(!newUser.username) {
        const message = 'Missing username in request body';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        newUser.favorites = [];
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

app.delete('/movies/:id', (req, res) =>{
    let movie = movies.find((movie) => { return movie.id === req.params.id });

    if (movie) {
        movies = movies.filter((obj) => { return obj.id !== req.params.id });
        res.status(201).send('Movie ' + req.params.id + ' was deleted.');
    }
});

app.delete('/users/:id', (req, res) =>{
    let user = users.find((user) => { return user.id === req.params.id });

    if (user) {
        users = users.filter((obj) => { return obj.id !== req.params.id });
        res.status(201).send('User with ID ' + req.params.id + ' was deleted.');
    }
});



// listen for requests
app.listen(8080, () => {
    console.log('ChaseFlix is listening on port 8080.')
});


