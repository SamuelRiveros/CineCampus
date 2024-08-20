const router = require('express').Router();
const path = require('path');

//user
const { createUser } = require('./controllers/userController');
const { userValidationRulesCreation } = require('./validators/userValidator');


router.get("/users", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, 'views/users.html'));
})

router.get("/users/v1", usuarioValidationRulesCreation(), createUser);
router.get("users/v2"), usuarioValidationGetAll(), 


module.exports = router;