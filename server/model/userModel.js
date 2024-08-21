const Connect = require ("../helper/db/connect")
const { ObjectId } = require ("mongodb")

class Cliente extends Connect {
    static instanceCliente; // Instancia Singleton de la clase Cliente
    
    constructor() {
        if (typeof Cliente.instanceCliente === "object") {
            return Cliente.instanceCliente;
        }
        super();
        this.collection = this.db.collection("cliente");
        Cliente.instanceCliente = this;
        return this;
    }

    async insertCliente(clienteParametro) {
        let res = await this.collection.insertOne(clienteParametro);
        return res;
    }

    async commandUsuario(usuarioParametro) {
        let res = await this.db.command(usuarioParametro);
        return res;
    }

    async findOneClienteByNickOrEmail(arg) {
        let res = await this.collection.findOne({
            $or: [
                { nick: arg.nick },
                { email: arg.email }
            ]
        });
        return res;
    }

    async saveUsuario(arg) {
        let { nombre, apellido, nick, email, telefono, tipo } = arg;
        let res = await this.collection.insertOne({
            nombre,
            apellido,
            nick,
            email,
            telefono,
            tipo
        });
        return res;
    }

    async createUsuarioCliente(arg) {
        let res = await this.db.command({
            createUser: arg.nick,
            pwd: arg.pwd,
            roles: [
                { role: "read", db: process.env.MONGO_DB },
                { role: arg.tipo, db: process.env.MONGO_DB },
                { role: "dbAdmin", db: process.env.MONGO_DB }
            ]
        });
        return res;
    }

    async createUsuarioAdmin(arg) {
        let res = await this.db.command({
            createUser: arg.nick,
            pwd: arg.pwd,
            roles: [
                { role: "readWrite", db: process.env.MONGO_DB },
                { role: arg.tipo, db: process.env.MONGO_DB },
                { role: "dbAdmin", db: process.env.MONGO_DB },
                { role: "userAdminAnyDatabase", db: "admin" },
                { role: "dbAdminAnyDatabase", db: "admin" }
            ]
        });
        return res;
    }

    async findClientes() {
        let res = await this.collection.find({}).toArray();
        return res;
    }

    async findClientesByType(arg) {
        let res = await this.collection.find({
            tipo: arg.tipo
        }).toArray();
        return res;
    }

    async updateCliente(clienteFilter, clienteParametro) {
        let res = await this.collection.updateOne(clienteFilter, clienteParametro);
        return res;
    }

    async aggregateCliente(clienteParametro) {
        let res = await this.collection.aggregate(clienteParametro).toArray();
        return res;
    }
}

module.exports = Cliente;
