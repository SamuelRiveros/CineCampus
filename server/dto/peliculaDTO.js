module.exports = class peliculaDTO {
  
    templateNotMovies(){
        return {
            status: 404,
            message: "No hay peliculas en catalogo"
        }
    }
  
    templateMovieError(arg){
        return {
            status: 500,
            message: "Ocurrio un error",
            data: arg
        }
    }
  
    templateMovieSaved(arg){
        return {
            status: 201,
            data: arg
        }
    }
  
    templateListMovies(arg){
        return {
            status: 200,
            data: arg
        }
    }
  }