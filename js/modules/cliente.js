import { connect } from "../../helper/db/connect.js";
import { ObjectId } from "mongodb";

export class Clientes extends connect {
    constructor() {
        if (typeof Clientes.instance === "object") {
            return Clientes.instance;
        }
        super();
        this.collection = this.db.collection('cliente');
        Clientes.instance = this;
        return this;
    }
}