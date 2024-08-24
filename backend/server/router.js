const router = require('express').Router();
const path = require('path');

//user
const userController = require('./controllers/userController');

const movieController = require('./controllers/movieController');

const { listAllMovies, listSpecificMovieDetails } = require('./controllers/movieController');
const { peliculaValidationEmpty, peliculalistingSpecifications } = require('./validators/movieValidator');

//seccion de usuarios 
router.post('/client', userController.createClient);
router.get('/users', userController.getUsersByRole);
router.put('/user', userController.updateUser);


// seccion peliculas

//Listar todas las pelis en catalogo
router.get("/movies/v1", peliculaValidationEmpty(), listAllMovies);
//Listar pelicula con datos en especifico
router.get("/movies/v2", peliculalistingSpecifications(), listSpecificMovieDetails)

module.exports = router;
