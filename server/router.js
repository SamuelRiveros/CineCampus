const router = require('express').Router();
const path = require('path');

//user
const { createUser } = require('./controllers/userController');
const { usuarioValidationRulesCreation } = require('./validators/userValidator');

const { listAllMovies } = require('./controllers/movieController');
const { peliculaValidationEmpty } = require('./validators/movieValidator');

router.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, 'views/users.html'));
});

router.post("/users/v1", usuarioValidationRulesCreation(), createUser);
router.get("/movies/v1", peliculaValidationEmpty(), listAllMovies);

module.exports = router;
