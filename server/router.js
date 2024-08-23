const router = require('express').Router();
const path = require('path');

//user
const { createUser } = require('./controllers/userController');
const { usuarioValidationRulesCreation } = require('./validators/userValidator');

const { listAllMovies, listSpecificMovieDetails } = require('./controllers/movieController');
const { peliculaValidationEmpty, peliculalistingSpecifications } = require('./validators/movieValidator');

router.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, 'views/users.html'));
});


// router.post("/users/v1", usuarioValidationRulesCreation(), createUser);

//Listar todas las pelis en catalogo
router.get("/movies/v1", peliculaValidationEmpty(), listAllMovies);
//Listar pelicula con datos en especifico
router.get("/movies/v2", peliculalistingSpecifications(), listSpecificMovieDetails)

module.exports = router;
