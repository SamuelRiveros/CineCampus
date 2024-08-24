const { validationResult } = require('express-validator');
const Clientes = require('../model/userModel');
const UsuarioDTO = require('../dto/userDTO');
const userValidator = require('../validators/userValidator');

const clienteModel = new Clientes();
const usuarioDTO = new UsuarioDTO();

exports.createClient = async (req, res) => {
    // Ejecuta las validaciones
    await Promise.all(userValidator.userCreationValidation().map(validator => validator.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(usuarioDTO.templateUserError(errors.array()));
    }

    try {
        const existingClient = await clienteModel.findoneusuario(req.body);
        if (existingClient) {
            return res.status(409).json(usuarioDTO.templateExistUser(existingClient));
        }

        const newClient = await clienteModel.createClientAndUser(req.body);
        res.status(201).json(usuarioDTO.templateUserSaved(newClient));
    } catch (err) {
        res.status(500).json(usuarioDTO.templateUserError(err.message));
    }
};

// Falta por desarrollar

// Función para obtener usuarios por rol
exports.getUsersByRole = async (req, res) => {
  await Promise.all(userValidator.usuarioEmptyValidation().map(validator => validator.run(req)));


  const { role } = req.query;

  try {
      const users = await clienteModel.getUsersByRole(role);
      if (users.length === 0) {
          return res.status(404).json(usuarioDTO.templateNotUsers());
      }
      res.status(200).json(usuarioDTO.templateListUsers(users));
  } catch (err) {
      res.status(500).json(usuarioDTO.templateUserError(err.message));
  }
};

// Función para actualizar usuario
exports.updateUser = async (req, res) => {
  const { userId, targetavip, isadmin } = req.body;

  try {
      const updatedUser = await clienteModel.updateuser(userId, targetavip, isadmin);
      if (!updatedUser) {
          return res.status(404).json(usuarioDTO.templateNotUsers());
      }
      res.status(200).json(usuarioDTO.templateUserSaved(updatedUser));
  } catch (err) {
      res.status(500).json(usuarioDTO.templateUserError(err.message));
  }
};