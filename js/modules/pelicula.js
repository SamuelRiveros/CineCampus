import { connect } from "../../connect.js";
import { MongoClient, ObjectId } from "mongodb";

export class Peliculas extends connect {
    static instance
    constructor() {
        if (typeof Peliculas.instance === "object") {
            return Peliculas.instance;
        }
        super();
        this.collection = this.db.collection("pelicula");
        Peliculas.instance = this;
        return this;
    }

    // ----- Selección de Películas, Caso de uso #1 ----- //

    // API para Listar Películas: Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.

    /**
     * @returns Aboslutamente todas las peliculas que hay en la coleccion de peliculas junto a sus detalles
     * @import 
     * TODO Importar la coleccion de funcion para mostrar los horarios de proyeccion y solamente las que estén en catalogo
     */

    async listAllMovies() {
        let res = await this.collection.find({}).toArray()
        return res;
    }

    // API para Obtener Detalles de Película: Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

    /**
     * 
     * @returns especificamente la pelicula "Inception" junto a sus datos completos
     */
    async listSpecificMovieDetails() {
        let res = await this.collection.findOne({"titulo" : "Inception"})
        return res;
    }
}

