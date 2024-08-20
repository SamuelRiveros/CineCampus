const Connect = require("../helpers/db/connect");

/**
 * Clase `Cliente` para gestionar operaciones relacionadas con la colección de Clientes en la base de datos.
 * Hereda de la clase `Connect`, que maneja la conexión a la base de datos.
 */
module.exports = class Cliente extends Connect {
    static instanceCliente; // Instancia Singleton de la clase Cliente
    
    /**
     * Crea una instancia de la clase `Cliente`.
     * Implementa el patrón Singleton para garantizar que solo haya una instancia de esta clase.
     */
    constructor() {
        if (typeof Cliente.instanceCliente === "object") {
            return Cliente.instanceCliente;
        }
        super();
        this.collection = this.db.collection("cliente");
        Cliente.instanceCliente = this;
        return this;
    }

    /**
     * @param {Object} clienteParametro - El objeto que especifica el documento a insertar en la colección
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la insercion del cliente
     */
    async insertCliente(clienteParametro) {
        let res = await this.collection.insertOne(clienteParametro)
        return res
    }

    /**
     * @param {Object} usuarioParametro - El objeto que especifica el comando a usar con respecto a la creacion de usuarios o el asignamiento de roles
     * @returns {Promise<Object>} Una promesa que resuelve con el documento del usuario insertado o con rol agregado
     */
    async commandUsuario(usuarioParametro) {
        let res = await this.db.command(usuarioParametro)
        return res
    }

    /**
     * @param {Object} arg - El objeto que especifica el filtro para buscar el cliente
     * @returns {Promise<Object>} Una promesa que resuelve con el documento del cliente buscado
     */
    async findOneClienteByNickOrEmail(arg) {
        let res = await this.collection.findOne({
            $or: [
                { nick: arg.nick },
                { email: arg.email }
            ]
        })
        return res
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
        return res
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
        })
        return res
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
        })
        return res
    }

    /**
     * Obtiene todos los clientes de la colección.
     * @returns {Promise<Array>} Una promesa que resuelve con un array de documentos de clientes.
     */
    async findClientes() {
        let res = await this.collection.find({}).toArray()
        return res
    }

    /**
     * Obtiene todos los clientes de la colección.
     * @param {Object} arg - El objeto que especifica el filtro para buscar los clientes
     * @returns {Promise<Array>} Una promesa que resuelve con un array de documentos de clientes.
     */
    async findClientesByType(arg) {
        let res = await this.collection.find({
            tipo: arg.tipo
        }).toArray()
        return res
    }

    /**
     * @param {Object} clienteFilter - El objeto que especifica el filtro para buscar el documento que se desea actualizar
     * @param {Object} clienteParametro - El objeto que especifica el documento de lo que se desea actualizar en el documento
     * @returns {Promise<Object>} Una promesa que resuelve con el resultado de la actualizacion del cliente
     */
    async updateCliente(clienteFilter, clienteParametro) {
        let res = await this.collection.updateOne(clienteFilter, clienteParametro)
        return res
    }

    async aggregateCliente(clienteParametro) {
        let res = await this.collection.aggregate(clienteParametro).toArray()
        return res
    }
}