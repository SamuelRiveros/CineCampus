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

    generateRandomPassword(length) {
        const charset = "abcdefg";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    async createClientAndUser() { 
        try {
            const clientData = {
                nombre: "Miguel Castro",
                telefono: 3234515699,
                email: "miguel.castro@gmail.com",
                targeta_vip: true
            };

            const existingCliente = await this.collection.findOne({
                nombre: clientData.nombre,
                telefono: clientData.telefono,
                email: clientData.email,
                targeta_vip: clientData.targeta_vip
            });

            if (existingCliente) {
                console.log("El usuario ya existe:");
                return existingCliente;
            } else {
                await this.collection.insertOne(clientData);
                console.log("Cliente ingresado");
            }
            
            // Creación del usuario
            const password = this.generateRandomPassword(8); // Contraseña de 8 caracteres
            const rol = clientData.targeta_vip ? "usuarioVip" : "usuarioEstandar";

            await this.db.command({
                createUser: clientData.email,
                pwd: password,
                roles: [
                  { role: rol, db: "CineCampus" }
                ]
            });

            console.log(`Usuario creado. Contraseña del usuario: ${password}`);
        } catch (error) {
            console.log(`Error al insertar cliente: ${error}`);
        } finally {
            await this.close();
        }
    }

    }