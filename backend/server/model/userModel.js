const Connect = require('../helper/db/connect');
const { ObjectId } = require('mongodb');

class Clientes extends Connect {
    constructor() {
        if (typeof Clientes.instance === "object") {
            return Clientes.instance;
        }
        super();
        this.collection = this.db.collection('cliente');
        Clientes.instance = this;
        return this;
    }

    async listAllUsers() {
        let res = await this.collection.find({}).toArray()
        return res;
    }

    async getUserById(userId) {
        try {
            let res = await this.collection.findOne({ _id: new ObjectId(userId) });
            return res;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Error fetching user');
        }
    }

    generateRandomPassword(length) {
        const charset = "abcdefg";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    async findoneusuario(clientData) {
        return await this.collection.findOne(clientData);
    }

    async createClientAndUser(clientData) {
        try {
            const password = this.generateRandomPassword(8);
            const rol = clientData.targeta_vip ? "usuarioVip" : "usuarioEstandar";

            await this.db.command({
                createUser: clientData.nombre,
                pwd: password,
                roles: [
                    { role: rol, db: "CineCampus" },
                    { role: "readWrite", db: "CineCampus" }
                ]
            });

            await this.collection.insertOne(clientData)
            console.log("Cliente ingresado en la coleccion de clientes")

            return clientData;
        } catch (error) {
            throw new Error(`Error al insertar cliente: ${error}`);
        } finally {
            await this.close();
        }
    }

    async findUsuario(usuarioid) {
        try {
            const adminDb = this.db;
            const user = await adminDb.command({ usersInfo: { user: usuarioid, db: "CineCampus" } });

            if (user && user.users && user.users.length > 0) {
                return user.users[0];
            } else {
                throw new Error("No existe un usuario con el nombre proporcionado");
            }
        } catch (error) {
            throw new Error(`Error al encontrar usuario: ${error}`);
        }
    }

    async updateuser(userId, targetavip, isadmin) {
        try {
            let res = await this.collection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { targeta_vip: targetavip } }
            );

            const user = await this.collection.findOne({ _id: new ObjectId(userId) });
            if (user) {
                const rol = user.targeta_vip ? "usuarioVip" : "usuarioEstandar";
                await this.db.command({
                    updateUser: user.nombre,
                    roles: [{ role: rol, db: "CineCampus" }]
                });

                if (isadmin) {
                    await this.db.command({
                        updateUser: user.nombre,
                        roles: [{ role: "administrador", db: "admin" }]
                    });
                }
                return user;
            } else {
                throw new Error(`No existe un usuario con el _id ${userId}`);
            }
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error}`);
        } finally {
            await this.close();
        }
    }

    async getUsersByRole(role = null) {
        try {
            const result = await this.db.command({ usersInfo: 1 });
            if (!result.users || result.users.length === 0) {
                return [];
            }

            return role
                ? result.users.filter(user => user.roles.some(r => r.role === role))
                : result.users;
        } catch (err) {
            throw new Error('Error al obtener usuarios:', err);
        }
    }
}

module.exports = Clientes;
