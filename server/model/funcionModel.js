import { connect } from "../helper/db/connect.js";
import { ObjectId } from "mongodb";

class Funciones extends connect {
    constructor() {
        if (typeof Funciones.instance === "object") {
            return Funciones.instance;
        }
        super();
        this.collection = this.db.collection('funcion');
        Funciones.instance = this;
        return this;
    }
}
module.exports = {Funciones}