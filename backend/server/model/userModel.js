const Connect = require('../helper/db/connect');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

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

    // Método para encontrar un usuario por nombre
    async findOne(query) {
        return await this.collection.findOne(query);
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
        const charset = "abcd";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    async findoneusuario(query) {
        return await this.collection.findOne(query);
    }    
    

    // Método para crear un nuevo cliente con contraseña en hash
    async createClientAndUser(clientData, pass) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(pass.contraseña, saltRounds);
    
            const rol = clientData.targeta_vip ? "usuarioVip" : "usuarioEstandar";
    
            await this.db.command({
                createUser: clientData.nombre,
                pwd: hashedPassword,
                roles: [
                    { role: rol, db: "CineCampus" },
                    { role: "readWrite", db: "CineCampus" }
                ]
            });
    
            // Aquí estamos almacenando el cliente sin la contraseña en texto claro
            const { contraseña, ...clientDataWithoutPassword } = clientData;
            await this.collection.insertOne(clientDataWithoutPassword);
            console.log("Cliente ingresado en la colección de clientes");
    
            return clientDataWithoutPassword; // No retornar la contraseña
        } catch (error) {
            throw new Error(`Error al insertar cliente: ${error.message}`);
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
