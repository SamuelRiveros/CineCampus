const router = require('express').Router();

//user
const userController = require('./controllers/userController');

const BoletaController = require("./controllers/boletaController")

const { listAllMovies, listSpecificMovieDetails, getMovieById } = require('./controllers/movieController');
const { peliculaValidationEmpty, peliculalistingSpecifications } = require('./validators/movieValidator');


// seccion peliculas

//Listar todas las pelis en catalogo
router.get("/getallmovies", peliculaValidationEmpty(), listAllMovies);

router.get("/getmoviebyid/:id", peliculaValidationEmpty(), getMovieById)

//Listar pelicula con datos en especifico
router.get("/getspecificmovie", peliculalistingSpecifications(), listSpecificMovieDetails)


//seccion de usuarios 
router.get('/getallusers', userController.listAllUsers);
router.get('/getuserbyid/:id', userController.getUserById);
router.post('/createclient', userController.createClient);
router.get('/getusersbyrole', userController.getUsersByRole);
router.put('/updateuser', userController.updateUser);


// seccion boletas

router.post('/buy', BoletaController.buyTicket);
router.get('/seats', BoletaController.listAllBoletas);
// router.get('/review/:funcionId/:sala', BoletaController.reviewSeats);
router.delete('/cancel', BoletaController.cancelTicket);

module.exports = router;