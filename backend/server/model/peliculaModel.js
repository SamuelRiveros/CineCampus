const Connect = require ("../helper/db/connect")
const { ObjectId } = require ("mongodb")

class Peliculas extends Connect {
    constructor() {
        if (typeof Peliculas.instance === "object") {
            return Peliculas.instance;
        }
        super();
        this.collection = this.db.collection("pelicula");
        this.funcioncollection = this.db.collection("funcion")
        Peliculas.instance = this;
        return this;
    }

    //* ----- Selección de Películas, Caso de uso #1 ----- //

    // API para Listar Películas: Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.

    /**
     * *Usamos Aggregate para proyectar los datos de la coleccion de peliculas, más las funciones que contiene de la coleccion de funciones, en base a su id que conectamos
     * @async
     * @returns {Promise<Object[]>} Una promesa que resuelve a un array de objetos, donde cada objeto representa una película con sus datos.
     * 
     * @typedef {Object} peliculascatalogo
     * @property {string} titulo - El título de la película.
     * @property {string} genero - El género de la película.
     * @property {number} duracion - La duración de la película en minutos.
     * @property {string[]} funciones - Un array de horarios de proyección de la película.
     */

    async listAllMovies() {

        const peliculasEnCatalogo = await this.collection.aggregate([
            { $match: { en_catalogo: true } }, //! validacion que consiste en que se filtren solo las que estén en catalogo
                {
                  $lookup: {
                    from: "funcion", //* Nombre de la colección a unir
                    localField: "_id", //* La id de la pelicula de la coleccion "pelicula"
                    foreignField: "Pelicula_id", //* Campo de la colección "funcion" para la unión
                    as: "funciones" //* Nombre del campo de salida con los datos unidos
                  }
                },
                {
                    $project: {
                        titulo: 1,
                        genero: 1,
                        sinopsis: 1,
                        duracion: 1,
                        funciones: "$funciones.horario_proyeccion", //! Proyectar solo el horario de proyección de la función
                        img: 1,
                        en_catalogo: 1,
                        trailer: 1
                    }
                }
              ]).toArray();

              const peliculasComingSoon = await this.collection.aggregate([
                { $match: { en_catalogo: false } }, //! validacion que consiste en que se filtren solo las que estén en catalogo
                    {
                      $lookup: {
                        from: "funcion", //* Nombre de la colección a unir
                        localField: "_id", //* La id de la pelicula de la coleccion "pelicula"
                        foreignField: "Pelicula_id", //* Campo de la colección "funcion" para la unión
                        as: "funciones" //* Nombre del campo de salida con los datos unidos
                      }
                    },
                    {
                        $project: {
                            titulo: 1,
                            genero: 1,
                            sinopsis: 1,
                            duracion: 1,
                            img: 1,
                            en_catalogo: 1,
                            trailer: 1
                        }
                    }
                  ]).toArray();

                  return { peliculasComingSoon, peliculasEnCatalogo}
    }

    // API para Obtener Detalles de Película: Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

    /**
     * @async
     * *nos devuelve todos los detalles de una pelicula, en este caso "Inception"
     * @returns {Object} especificamente la pelicula "Inception" junto a sus datos detallados
     */
    async listSpecificMovieDetails(moviedetails) {
        let res = await this.collection.findOne(moviedetails)
        return res;
    }

    async getmovieById(movieId) {
        try {
            let res = await this.collection.findOne({ _id: new ObjectId(movieId) });
            return res;
        } catch (error) {
            console.error('Error fetching movie:', error);
            throw new Error('Error fetching movie');
        }
    }
    
}
module.exports = Peliculas