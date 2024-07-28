import { connect } from "./connect.js";
import { Peliculas } from "./js/modules/pelicula.js";
import { Funciones } from "./js/modules/funcion.js";
import { Clientes } from "./js/modules/cliente.js";
import { Boletas } from "./js/modules/boleta.js";
import { ObjectId } from "mongodb";

// let caso = new Boletas()
// console.log(await caso.testfunciones())

//* Caso de uso 2, usamos parametros para verificar cuantos asientos hay disponibles en una sala especifica

let caso2 = new Boletas()

const funcionId = "66a595c6f6f7d62733068ac9"; // Cambia esto por un ID válido
const sala = 3;

const asientosDisponibles = await caso2.seatsReview(funcionId, sala);

console.log(asientosDisponibles)