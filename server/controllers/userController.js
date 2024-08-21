const { validationResult } = require('express-validator');
const UserDTO = require('../dto/userDto');
const User = require('../model/userModel')

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors: errors.array() });
  const userDTO = new userDTO();
  const obj = new User();
  let resModel = await obj.findOneClienteByNickOrEmail(req.body);
  let data = (resModel) ? userDTO.templateExistUser(resModel) : userDTO.templateNotUsers();
  if(data.status == 200) res.status(data.status).json(data);
  if(data.status == 404) resModel = await obj.saveUsuario(req.body);
  data = (resModel.acknowledged) ? userDTO.templateUserSaved(req.body) : userDTO.templateUserError(resModel);
  if(data.status == 500) res.status(data.status).json(data);
  if(data.status == 201) data = userDTO.typeToRole(req.body);
  if(data.tipo == "Administrador"){resModel = await obj.createUsuarioAdmin(data)} else{resModel = await obj.createUsuarioCliente(data)};
  data = (resModel.ok) ? userDTO.templateUserSaved(req.body) : userDTO.templateUserError(resModel);
  if(data.status == 500) res.status(data.status).json(data);
  res.status(data.status).json(data);
}

module.exports = { createUser };

// const { validationResult } = require('express-validator');
// const User = require('../models/userModel');
// const UserDTO = require('../dto/userDTO');

// const listAllUsers = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const userDTO = new UserDTO();
//   const obj = new User();
  
//   try {
//     let resModel = await obj.findOneClienteByNickOrEmail(req.body);
//     let data = (resModel) ? userDTO.templateExistUser(resModel) : userDTO.templateNotUsers();
    
//     if (data.status === 200) {
//       return res.status(data.status).json(data);
//     }
    
//     if (data.status === 404) {
//       resModel = await obj.saveUsuario(req.body);
//       data = (resModel.acknowledged) ? userDTO.templateUserSaved(req.body) : userDTO.templateUserError(resModel);
      
//       if (data.status === 500) {
//         return res.status(data.status).json(data);
//       }
      
//       data = (req.body.tipo === "Administrador") 
//         ? await obj.createUsuarioAdmin(data)
//         : await obj.createUsuarioCliente(data);
      
//       data = (resModel.ok) ? userDTO.templateUserSaved(req.body) : userDTO.templateUserError(resModel);
      
//       if (data.status === 500) {
//         return res.status(data.status).json(data);
//       }
      
//       return res.status(data.status).json(data);
//     }
//   } catch (error) {
//     return res.status(500).json(userDTO.templateMovieError(error.message));
//   }
// };

// module.exports = {
//   listAllUsers
// };
