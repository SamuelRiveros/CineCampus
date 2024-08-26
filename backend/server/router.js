const router = require('express').Router();
const path = require('path');

//user
const userController = require('./controllers/userController');

const { listAllMovies, listSpecificMovieDetails } = require('./controllers/movieController');
const { peliculaValidationEmpty, peliculalistingSpecifications } = require('./validators/movieValidator');

// seccion peliculas

//Listar todas las pelis en catalogo
router.get("/getallmovies", peliculaValidationEmpty(), listAllMovies);
//Listar pelicula con datos en especifico
router.get("/getspecificmovie", peliculalistingSpecifications(), listSpecificMovieDetails)


//seccion de usuarios 
router.get('/getallusers', userController.listAllUsers);
router.get('/getuserbyid/:id', userController.getUserById);
router.post('/createclient', userController.createClient);
router.get('/getusersbyrole', userController.getUsersByRole);
router.put('/updateuser', userController.updateUser);



module.exports = router;
