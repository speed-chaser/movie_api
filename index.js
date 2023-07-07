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

let movies = [
    {
        title: 'Good Will Hunting',
        genre: ['Romance','Drama','Indie'],
        director: {
            name: 'Gus Van Sant',
            birthYear: 1952,
            bio: 'Gus Green Van Sant Jr. is an American film director, producer, photographer, and musician. He has earned \
            acclaim as both an independent and mainstream filmmaker. His films typically deal with themes of marginalized \
            subcultures, in particular homosexuality.'
        }

    },
    {
        title: 'The Social Network',
        genre: ['Drama','Historical Drama', 'Historical Fiction'],
        director: {
            name: 'David Fincher',
            birthYear: 1962,
            bio: 'David Andrew Leo Fincher is an American filmmaker. His films, most of which are psychological thrillers, \
            have collectively grossed over $2.1 billion worldwide and have received 10 Academy Award nominations; this \
            includes three Best Director nominations for him.'
        }
    },
    {
        title: 'Django: Unchained',
        genre: ['Western','Action','Adventure'],
        director: {
            name: 'Quentin Tarantino',
            birthYear: 1963,
            bio: 'Quentin Jerome Tarantino is an American film director, writer, producer, and actor. His films are characterized\
             by stylized violence, extended dialogue including a pervasive use of profanity, and references to popular culture.'
        }
    },
    {
        title: 'Scott Pilgrim vs. the World',
        genre: ['Comedy','Action','Romance'],
        director: {
            name: 'Edgar Wright',
            birthYear: '1974',
            bio: 'Edgar Howard Wright is an English filmmaker. He is known for his fast-paced and kinetic, satirical genre films,\
             which feature extensive utilisation of expressive popular music, Steadicam tracking shots, dolly zooms and a signature\
              editing style that includes transitions, whip pans and wipes.'
        }
    },
    {
        title: 'Back to the Future',
        genre: ['Sci-Fi','Comedy','Adventure'],
        director: {
            name: 'Robert Zemeckis',
            birthYear: '1952',
            bio: 'Robert Lee Zemeckis is an American filmmaker. He first came to public attention as the director of the action-adventure\
             romantic comedy Romancing the Stone, the science-fiction comedy Back to the Future film trilogy, and the live-action/animated\
              comedy Who Framed Roger Rabbit.'
        }
    },
    {
        title: 'Bottle Rocket',
        genre: ['Comedy','Drama','Crime'],
        director: {
            name: 'Wes Anderson',
            birthYear: 1969,
            bio: 'Wesley Wales Anderson is an American filmmaker. His films are known for their eccentricity, unique visual and narrative\
             styles, and frequent use of ensemble casts. They often contain themes of grief, loss of innocence, and dysfunctional families.\
              Anderson is cited by some critics as a modern-day example of an auteur.'
        }
    },
    {
        title: 'True Romance',
        genre: ['Romance','Drama','Crime'],
        director: {
            name: 'Tony Scott',
            birthYear: 1944,
            bio: 'Anthony David Leighton Scott was an English film director and producer. He was known for directing highly successful action\
             and thriller films such as Top Gun, Beverly Hills Cop II, Days of Thunder, The Last Boy Scout, True Romance, Crimson Tide, Enemy\
              of the State, Man on Fire, Déjà Vu, and Unstoppable.'
        }
    },
    {
        title: 'Dead Poets Society',
        genre: ['Comedy','Teen','Drama'],
        director: {
            name: 'Peter Weir',
            birthYear: 1944,
            bio: 'Peter Lindsay Weir AM is a retired Australian film director. He is known for directing films crossing various genres over\
             forty years with films such as Picnic at Hanging Rock, Gallipoli, Witness, Dead Poets Society, Fearless, The Truman Show, Master\
              and Commander: The Far Side of the World, and The Way Back.'
        }
    },
    {
        title: 'Interstellar',
        genre: ['Sci-Fi','Drama','Adventure'],
        director: {
            name: 'Christopher Nolan',
            birthYear: 1970,
            bio: 'Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling,\
             Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide.'
        }
    },
    {
        title: 'Catch Me If You Can',
        genre: ['Comedy','Crime','Drama'],
        director: {
            name: 'Steven Spielberg',
            birthYear: 1946,
            bio: 'Steven Allan Spielberg KBE is an American filmmaker. A major figure of the New Hollywood era and pioneer of the modern blockbuster,\
             he is the most commercially successful director in history'
        }
    }

];

let users = [
    {
        id: '00000000-0000-000e-0000-000000000000',
        username: 'Chase',
        email: 'chase@chaseflix.com',
        password: 'admin',
        favorites: []
    },
    {
        id: '2',
        username: 'Mace',
        email: 'mace@gmail.com',
        password: 'brother222',
        favorites: [],
    }
];


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


