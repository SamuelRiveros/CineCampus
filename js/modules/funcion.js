const { connect } = require ("../../helper/db/connect")
const { ObjectId } = require ("mongodb")

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