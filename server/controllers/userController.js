const { validationResult } = require('express-validator');
const UserDTO = require('../dto/userDto');
const User = require('../model/userModel')

const createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const userDto = new UserDTO(req.body);
  const obj = new User()
  res.status(201).json({logica: obj.findOneById(userDto)});
};

module.exports = { createUser };