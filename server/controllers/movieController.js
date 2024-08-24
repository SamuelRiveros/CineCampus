const Peliculas = require('../model/peliculaModel');
const PeliculaDTO = require('../dto/peliculaDTO');
const movieValidator = require("../validators/movieValidator");

const peliculaDTO = new PeliculaDTO();
const peliculasModel = new Peliculas(); // Crea una instancia de Peliculas

exports.listpeliculas = async (req, res) => {
    // await Promise.all(movieValidator.peliculaValidationEmpty().map(validator => validator.run(req)));


    try {
        const movies = await peliculasModel.listAllMovies(); // Llama al método definido en la clase

        if (movies.length === 0) {
            return res.status(404).json(peliculaDTO.templateNotMovies());
        }

        return res.status(200).json(peliculaDTO.templateListMovies(movies));
    } catch (error) {
        console.error("Error al listar las películas:", error); // Añade un log para depuración
        return res.status(500).json(peliculaDTO.templateMovieError(error.message));
    }
};

// exports.listSpecificMovieDetails = async(req, res) => {
//     await Promise.all(movieValidator.peliculalistingSpecifications().map(validator => validator.run(req)));
    
//     const peliculaDTO = new PeliculaDTO();
//     const peliculasModel = new Peliculas();

//     const moviedetails = req.query || req.body;
    
//     try {
//         const movie = await peliculasModel.listSpecificMovieDetails(moviedetails);
        
//         if(!movie) {
//             return res.status(404).json(peliculaDTO.templateNotMovies());
//         }

//         return res.status(200).json(peliculaDTO.templateListMovies([movie]));
        
//     } catch(error) {
//         console.error("Error al obtener detalles de la película:", error); // Añade un log para depuración
//         return res.status(500).json(peliculaDTO.templateMovieError(error.message));
//     }
// }
