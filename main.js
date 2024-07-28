import { connect } from "./connect.js";
import { Peliculas } from "./js/modules/pelicula.js";
import { Funciones } from "./js/modules/funcion.js";
import { Clientes } from "./js/modules/cliente.js";
import { Boletas } from "./js/modules/boleta.js";

let caso = new Boletas()
console.log(await caso.testfunciones())