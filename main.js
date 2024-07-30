import { connect } from "./connect.js";
import { Peliculas } from "./js/modules/pelicula.js";
import { Funciones } from "./js/modules/funcion.js";
import { Clientes } from "./js/modules/cliente.js";
import { Boletas } from "./js/modules/boleta.js";
import { ObjectId } from "mongodb";
import { CreacionUsuario } from "./users&roles/users.js";

// let caso = new Clientes()
// console.log(await caso.createClientAndUser())

// errores como obj son :

// return {error: "el skakdasdllas"}

//* Caso de uso 2, usamos parametros para verificar cuantos asientos hay disponibles en una sala especifica

// let caso2 = new Boletas()

// const funcionId = "66a595c6f6f7d62733068ac9"; // Cambia esto por un ID válido
// const sala = 2;

// const asientosDisponibles = await caso2.seatsReview(funcionId, sala);

// console.log(asientosDisponibles)

//* Estos roles ya están en la db, sin embargo dejo los comandos para saber como se crearon
/*
db.createRole({
    role: "administrador",
    privileges: [
      {
        resource: { db: "CineCampus", collection: "" },
        actions: [ "find", "find", "remove", "update", "createCollection", "createIndex", "dropCollection", "dropIndex", "listIndexes", "collStats", "dbStats", "runCommand"]
      }
    ],
    roles: []
});


db.createRole({
    role: "usuarioEstandar",
    privileges: [
      {
        resource: { db: "CineCampus", collection: "pelicula" },
        actions: [ "find" ]
      },
      {
        resource: { db: "CineCampus", collection: "funcion" },
        actions: [ "find" ]
      },
      {
        resource: { db: "CineCampus", collection: "boleta" },
        actions: [ "insert", "find", "remove" ]
      }
    ],
    roles: []
});

db.createRole({
    role: "usuarioVip",
    privileges: [
      {
        resource: { db: "CineCampus", collection: "pelicula" },
        actions: [ "find" ]
      },
      {
        resource: { db: "CineCampus", collection: "funcion" },
        actions: [ "find" ]
      },
      {
        resource: { db: "CineCampus", collection: "boleta" },
        actions: [ "insert", "find", "remove" ]
      }
    ],
    roles: []
});
  */
 
  // si el usuario al ingresarse tiene targeta_vip como true, se le dará el rol de user_vip