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


const listSpecificMovieDetails = async(req, res) => {
  const peliculaDTO = new PeliculaDTO();
  const peliculasModel = new Peliculas();

  const moviedetails = req.query || req.body;
  
  try {
    const movie = await peliculasModel.listSpecificMovieDetails(moviedetails);
    
    if(!movie) {
      return res.status(404).json(peliculaDTO.templateNotMovies());

    }

    return res.status(200).json(peliculaDTO.templateListMovies([movie]));
    
  } catch(error) {
    return res.status(500).json(peliculaDTO.templateMovieError(error.message));
  }
}


module.exports = {
  listAllMovies,
  listSpecificMovieDetails
};