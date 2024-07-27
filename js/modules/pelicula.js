import { connect } from "../../helper/db/connect.js";
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
}

