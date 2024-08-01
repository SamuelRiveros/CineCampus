import { ObjectId } from "mongodb";
import { connect } from "../../helper/db/connect.js";

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

    /**
     * *usamos math.random para generar un password al azar con las letras que se encuentran dentro de charset
     * @param {number} length longitud deseada de la contraseña
     * @returns {string} la contraseña que se genera
     */

    generateRandomPassword(length) {
        const charset = "abcdefg";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    /**
     * *Creamos el cliente y el usuario de mongo de forma respectiva
     * @returns {object} el cliente ingresado, si no tenemos errores no nos envía nada
     */

    async createClientAndUser(clientData) {
        try {
            
            const rol = clientData.targeta_vip ? "usuarioVip" : "usuarioEstandar";

            const existingCliente = await this.collection.findOne({
                nombre: clientData.nombre,
                telefono: clientData.telefono,
                email: clientData.email,
                targeta_vip: clientData.targeta_vip,
                rol: clientData.rol
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
            //*Esto es un ternario , un if acortado, si targeta vip es true, se le asigna a la variable rol "usuarioVip" , si es false, será "usuarioEstandar"


            if (clientData.admin === true){
                console.log("ES ADMIN WOHOOO")
                await this.db.command({
                    createUser: clientData.nombre,
                    pwd: password,
                    roles: [
                      { role: "administrador", db: "CineCampus" },
                      { role : "readWrite", db: "CineCampus"}
                    ]
                });
                console.log(`Usuario creado. Contraseña del usuario: ${password}`);
                return clientData;
            }

            await this.db.command({
                createUser: clientData.nombre,
                pwd: password,
                roles: [
                  { role: rol, db: "CineCampus" },
                  { role : "readWrite", db: "CineCampus"}
                ]
            });

            console.log(`Usuario creado. Contraseña del usuario: ${password}`);
            return "";
        } catch (error) {
            console.log(`Error al insertar cliente: ${error}`);
        } finally {
            await this.close();
        }
    }
    
    //2. **API para Obtener Detalles de Usuario:** Permitir la consulta de información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.
    async findUsuario() {
        try {
            // Conectar a la base de datos admin
            const adminDb = this.db.admin(); // Obtén la instancia de la base de datos admin
    
            // Ejecuta el comando para obtener la información del usuario
            const user = await adminDb.command({ 
                usersInfo: { user: "Juan", db: "CineCampus" } // Reemplaza "nombreuser" con el nombre del usuario y ajusta la base de datos si es necesario
            });

            let res = this.collection.findOne({ _id: new ObjectId("66ac08be701f366205f09d12")})
    
            if (user && user.users && user.users.length > 0) {
                const userInfo = user.users[0]; // Suponiendo que devuelve un array de usuarios, selecciona el primer resultado
                console.log(`Información del usuario ${userInfo.user}:`);
                console.log(`Roles: ${JSON.stringify(userInfo.roles, null, 2)}`);
            } else {
                console.log("No existe un usuario con el nombre proporcionado");
            }

            return res;


        } catch (error) {
            console.log("Error al encontrar usuario:", error);
        } finally {
            // await this.close() // Descomenta si necesitas cerrar la conexión aquí
        }
    }
    
    
    
    //3. **API para Actualizar Rol de Usuario:** Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).
    
    /**
     * 
     * @returns {object} Nos devuelve el mensaje de actualizacón correcta
     * @throws {error} En caso de que el usuario no se pueda actualizar 
     */

    //aqui actualizo un usuario ya que mi logica es que cuando cambie la targeta vip, se le actualice el user que también 
    async updateuser() {
        const userId = new ObjectId("66aa7ac9d3c62f8e7866024c");
    
        try {
            // Intentamos actualizar el usuario
            let res = await this.collection.updateOne(
                { _id: userId },
                {
                    $set: {
                        targeta_vip: false
                    }
                }
            );
    
            // Verificamos si el usuario fue actualizado
            const user = await this.collection.findOne({ _id: userId });
    
            if (user) {
                const rol = user.targeta_vip ? "usuarioVip" : "usuarioEstandar";
                await this.db.command({
                    updateUser: user.email,
                    roles: [
                        { role: rol, db: "CineCampus" }
                    ]
                });
    
                console.log(`El rol del usuario ${user.email} ha sido actualizado a ${rol} ya que ahora no tiene targeta vip`);
                return "";
            } else {
                //! validacion, Si el usuario no existe, muestra un mensaje de error
                console.log(`Error: No existe un usuario con el _id ${userId}`);
                return "";
            }
        } catch (error) {
            console.log(`Error al actualizar usuario: ${error}`);
        } finally { 
            // await this.close()
        }
    }
    

    //AQUI ESTA LA CONSULTA DE FILTRAR O TODOS, O POR ROL DE MONGODB DE USUARIOVIP O DE USUARIOESTANDAR O DE ADMIN

    async getUsersByRole(role = null) {
        try {
            // Obtener la información de los usuarios
            const db = this.db;
            const result = await db.command({ usersInfo: 1 });
    
            // console.log('Resultado del comando usersInfo:', result);
    
            // Verificar si hay usuarios en el resultado
            if (!result.users || result.users.length === 0) {
                console.log('No se encontraron usuarios.');
                return [];
            }

            // Filtrar usuarios por rol, si se especifica
            const filteredUsers = role
                ? result.users.filter(user =>
                    user.roles.some(r => r.role === role)
                )
                :result.users; // Si no se especifica rol, devolver todos los usuarios

                if (role === null) {
                    console.log("Todos los usuarios:")
                    return filteredUsers;
                } else {
                    console.log(`Usuarios con rol " ${role} " encontrados:`);
                    return filteredUsers;

                }

        } catch (err) {
            console.error('Error al obtener usuarios:', err);
            throw err; // Re-throw the error to handle it outside if needed
        }
    }
    
}