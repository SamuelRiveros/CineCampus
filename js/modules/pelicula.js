import { connect } from "../../connect.js";
import { MongoClient, ObjectId } from "mongodb";

export class Peliculas extends connect {
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
     * @returns Aboslutamente todas las peliculas que hay en la coleccion de peliculas junto a sus detalles
     * *Usamos Aggregate para proyectar los datos de la coleccion de peliculas, más las funciones que contiene de la coleccion de funciones, en base a su id que conectamos
     */

    async listAllMovies() {

        let res = await this.collection.aggregate([
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
                        duracion: 1,
                        funciones: "$funciones.horario_proyeccion" //! Proyectar solo el horario de proyección de la función
                    }
                }
              ]).toArray();


        return res;
    }

    // API para Obtener Detalles de Película: Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

    /**
     * @returns especificamente la pelicula "Inception" junto a sus datos detallados
     */
    async listSpecificMovieDetails() {
        let res = await this.collection.findOne({"titulo" : "Inception"})
        return res;
    }
}