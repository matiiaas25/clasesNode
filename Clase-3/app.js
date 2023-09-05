const express = require('express')
const crypto = require('node:crypto')
const {validateMovie} = require('./Schemas/movies')
const { validatePartialMovie } = require('./Schemas/movies')
const z = require ('zod')
const movies = require('./movies.json')
const { validateHeaderName } = require('node:http')
const app = express ()
app.disable('x-powered-by')
app.use(express.json())
app.use(express.static('./web'))

//app.get('/', (req, res) => {
//    res.json({message: 'mi api'})
//})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/web/index.html'); // Ruta al archivo HTML principal
  });

//todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
    const {genre} = req.query
    if (genre) { 
        const filteredMovies = movies.filter (
            movie => movie.genre.some( g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp (expresiones regulares) 
    const {id} = req.params
    const movie = movies.find(movie => movie.id == id)
    if (movie) return res.json(movie) 
     res.status(404).json({message: 'Movie not found'})
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(), // uuid v4 (universal unique identifier)
        ...result.data
    }
    movies.push(newMovie)
    //res.status(201).json(newMovie)
})

app.patch ('/movies/:id', (req, res) => {
    
    const result = validatePartialMovie(req.body)
    if(!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    console.log('Result of validation:', result)

    const { id } = req.params;
    console.log('Received movie ID:', id);


    
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex == -1) {return res.status(404).json({message: 'Movie not found'})}
    console.log('Movie index:', movieIndex);

    console.log('Movies before update:', movies);

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
     
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})
app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    next();
});
