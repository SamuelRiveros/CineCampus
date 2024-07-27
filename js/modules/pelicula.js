import { connect } from "../../connect.js";
import { ObjectId } from "mongodb";

export class Peliculas extends connect {
    constructor() {
        if (typeof Peliculas.instance === "object") {
            return Peliculas.instance;
        }
        super();
        this.collection = this.db.collection('pelicula');
        Peliculas.instance = this;
        return this;
    }

    // ----- Selección de Películas, Caso de uso #1 ----- //

    // API para Listar Películas: Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.}

    async listAllMovies() {
        let res = await this.collection.find({}, {}).toArray()
        return res;
    }
    // API para Obtener Detalles de Película: Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.
}

