const { validationResult } = require('express-validator');
const Clientes = require('../model/userModel');
const UsuarioDTO = require('../dto/userDTO');
const userValidator = require('../validators/userValidator');
const bcrypt = require('bcrypt');

exports.listAllUsers = async (req, res) => {
    await Promise.all(userValidator.usuarioEmptyValidation().map(validator => validator.run(req)));

    const userDTO = new UsuarioDTO();
    const clienteModel = new Clientes();
  
    try {
      const users = await clienteModel.listAllUsers();
      
      if (users.length === 0) {
        return res.status(404).json(userDTO.templateNotUsers());
      }
  
      return res.status(200).json(userDTO.templateListUsers(users));
    } catch (err) {
      return res.status(500).json(userDTO.templateUserError(err.message));
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id; // Obtener el ID de los parámetros de la URL
    
    const userDTO = new UsuarioDTO();
    const clienteModel = new Clientes();
  
    try {
      const user = await clienteModel.getUserById(userId);
  
      if (!user) {
        return res.status(404).json(userDTO.templateNotUsers());
      }
  
      return res.status(200).json(userDTO.templateExistUser(user));
    } catch (err) {
      return res.status(500).json(userDTO.templateUserError(err.message));
    }
  };

  exports.createClient = async (req, res) => {
    const userDTO = new UsuarioDTO();
    const clienteModel = new Clientes();

    await Promise.all(userValidator.userCreationValidation().map(validator => validator.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(userDTO.templateUserError(errors.array()));
    }

    try {
        const existingClient = await clienteModel.findoneusuario({nombre: req.body.nombre});
        if (existingClient) {
            return res.status(409).json(userDTO.templateExistUser(existingClient));
        }

        const newClient = await clienteModel.createClientAndUser(req.body, req.body);
        res.status(201).json(userDTO.templateUserSaved(newClient));
    } catch (err) {
        res.status(500).json(userDTO.templateUserError(err.message));
    }
};

exports.loginUser = async (req, res) => {
  const { nombre, contraseña } = req.body;
  const userDTO = new UsuarioDTO();
  const clienteModel = new Clientes();

  try {
    // Buscar el cliente por nombre
    const client = await clienteModel.findoneusuario({ nombre });
    if (!client) {
      return res.status(401).json(userDTO.templateUserError('Usuario no encontrado'));
    }

    // Verificar que el campo de la contraseña esté presente en el cliente
    if (!client.contraseña) {
      return res.status(500).json(userDTO.templateUserError('Error interno del servidor: contraseña no encontrada'));
    }

    // Comparar la contraseña
    const match = await bcrypt.compare(contraseña, client.contraseña);
    if (!match) {
      return res.status(401).json(userDTO.templateUserError('Contraseña incorrecta'));
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (err) {
    console.error('Error al autenticar usuario:', err); // Añadido para depuración
    res.status(500).json(userDTO.templateUserError(`Error al autenticar usuario: ${err.message}`));
  }
};





// Función para obtener usuarios por rol
exports.getUsersByRole = async (req, res) => {
  const userDTO = new UsuarioDTO();
  const clienteModel = new Clientes();

  await Promise.all(userValidator.usuarioEmptyValidation().map(validator => validator.run(req)));


  const { role } = req.query;

  try {
      const users = await clienteModel.getUsersByRole(role);
      if (users.length === 0) {
          return res.status(404).json(userDTO.templateNotUsers());
      }
      res.status(200).json(userDTO.templateListUsers(users));
  } catch (err) {
      res.status(500).json(userDTO.templateUserError(err.message));
  }
};

// Función para actualizar usuario
exports.updateUser = async (req, res) => {
  const userDTO = new UsuarioDTO();
  const clienteModel = new Clientes();
  
  const { userId, targetavip, isadmin } = req.body;

  try {
      const updatedUser = await clienteModel.updateuser(userId, targetavip, isadmin);
      if (!updatedUser) {
          return res.status(404).json(userDTO.templateNotUsers());
      }
      res.status(200).json(userDTO.templateUserSaved(updatedUser));
  } catch (err) {
      res.status(500).json(userDTO.templateUserError(err.message));
  }
};