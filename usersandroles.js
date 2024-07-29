import { connect } from "./connect.js";
import { ObjectId } from "mongodb";

// Crear usuario "usuario"
export class CreacionUsuario extends connect {
    constructor() {

        super();
        CreacionUsuario.instance = this;
        return this;
    }
    
    async crearUsuario(){
        
        const usuarioRole = {
            role: "usuarioEstandar",
            privileges : [
                {
                    resource: { db: "CineCampus", collection: "boleta" },
                    actions: ["find", "insert", "update", "delete"]
                }
            ],
            roles : []
            
        };
        
        await db.command({
            createRole: usuarioRole.role,
            privileges: usuarioRole.privileges,
            roles: usuarioRole.roles
          });
        
          console.log("Role creado correctamente");
        
        // run().catch(console.dir);
        
        async function createUser(db) {
            await db.command({
              createUser: "usuarioEstandar",
              pwd: "usuario123",
              roles: [{ role: "usuarioEstandar", db: "CineCampus" }]
            });
          
            console.log("Usuario creado correctamente");
          }
          
        //   run().catch(console.dir);

    }

    async crearUsuarioVip(){

        const usuarioVipRole = {
            role: "usuarioVip",
            privileges : [
                {
                    resource: { db: "CineCampus", collection: "boleta" },
                    actions: ["find", "insert", "update", "delete"]
                }
            ],
            roles : []
            
        };
        
        await db.command({
            createRole: usuarioVipRole.role,
            privileges: usuarioVipRole.privileges,
            roles: usuarioVipRole.roles
          });
        
          console.log("Role creado correctamente");
        
        // run().catch(console.dir);
        
        async function createUserVip(db) {
            await db.command({
              createUser: "usuarioVip",
              pwd: "usuario123",
              roles: [{ role: "usuarioEstandar", db: "CineCampus" }]
            });
          
            console.log("Usuario creado correctamente");
          }
          
        //   run().catch(console.dir);

    }
    
}
    


  



const usuarioVipRol = {

}