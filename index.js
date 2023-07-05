const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

const app = express();

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
console.log('boop');
});

app.use(morgan('common'));

let topMovies = [
    {
        title: 'Good Will Hunting',
        director: 'Gus Van Sant'
    },
    {
        title: 'The Social Network',
        director: 'David Fincher'
    },
    {
        title: 'Django: Unchained',
        director: 'Quentin Tarantino'
    },
    {
        title: 'Scott Pilgrim vs. the World',
        director: 'Edgar Wright'
    },
    {
        title: 'Back to the Future',
        director: 'Robert Zemeckis'
    },
    {
        title: 'Bottle Rocket',
        director: 'Wes Anderson'
    },
    {
        title: 'True Romance',
        director: 'Tony Scott'
    },
    {
        title: 'Dead Poets Society',
        director: 'Peter Weird'
    },
    {
        title: 'Interstellar',
        director: 'Christopher Nolan'
    },
    {
        title: 'Catch Me If You Can',
        director: 'Steven Spielberg'
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
    res.json(topMovies);
});

app.use(bodyParser.urlencoded({
    extended: true
}));

// listen for requests
app.listen(8080, () => {
    console.log('ChaseFlix is listening on port 8080.')
});


