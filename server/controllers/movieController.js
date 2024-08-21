const { validationResult } = require('express-validator');
const PeliculaDTO = require('../dto/peliculaDTO');
const Peliculas = require('../model/peliculaModel');

const listAllMovies = async (req, res) => {
  const peliculaDTO = new PeliculaDTO();
  const peliculasModel = new Peliculas();

  try {
    const movies = await peliculasModel.listAllMovies();
    
    if (movies.length === 0) {
      return res.status(404).json(peliculaDTO.templateNotMovies());
    }

    return res.status(200).json(peliculaDTO.templateListMovies(movies));
  } catch (error) {
    return res.status(500).json(peliculaDTO.templateMovieError(error.message));
  }
};

module.exports = {
  listAllMovies
};

// const listAllMovies = async (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) return res.status(400).json({errors: errors.array() });
//     const userDTO = new userDTO();
//     const obj = new User();
//     let resModel = await obj.findOneClienteByNickOrEmail(req.body);
//     let data = (resModel) ? userDTO.templateExistUser(resModel) : userDTO.templateNotUsers();
//     if(data.status == 200) res.status(data.status).json(data);
//     if(data.status == 404) resModel = await obj.saveUsuario(req.body);
//     data = (resModel.acknowledged) ? userDTO.templateUserSaved(req.body) : userDTO.templateUserError(resModel);
//     if(data.status == 500) res.status(data.status).json(data);
//     if(data.status == 201) data = userDTO.typeToRole(req.body);
//     if(data.tipo == "Administrador"){resModel = await obj.createUsuarioAdmin(data)} else{resModel = await obj.createUsuarioCliente(data)};
//     data = (resModel.ok) ? userDTO.templateUserSaved(req.body) : userDTO.templateUserError(resModel);
//     if(data.status == 500) res.status(data.status).json(data);
//     res.status(data.status).json(data);
//   }
  
//   module.exports = { createUser };
  
  