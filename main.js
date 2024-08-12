const connect = require("./helper/db/connect");
const { Peliculas } = require("./js/modules/pelicula");
const { Funciones } = require("./js/modules/funcion");
const { Clientes } = require("./js/modules/cliente");
const { Boletas } = require("./js/modules/boleta");
const { ObjectId } = require("mongodb");


let caso = new Peliculas()
caso.listAllMovies().then(res => console.log(res)).catch(res => console.log(res))