import { connect } from "../../connect.js";

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


    async createUser() {
        let res = await this.collection.createClienteAndUser(
            
        );
    }
}