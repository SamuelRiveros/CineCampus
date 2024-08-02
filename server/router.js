const router = require('express').Router();
const path = require('path');
const { createUser } = require('./controllers/userController');
const { userValidationRules } = require('./validators/userValidator');


router.get("/users", (req, res)=>{
    res.sendFile(path.join(req.__dirname, process.env.EXPRESS_STATIC, 'views/users.html'));
})
router.get('/users/v1', userValidationRules(), createUser);


module.exports = router;