const  Connect  = require ( "./server/helper/db/connect")
const  Peliculas  = require ( "./server/model/peliculaModel")
const  Funciones  = require ( "./server/model/funcionModel" )
const  Clientes  = require ( "./server/model/userModel")
const  Boletas  = require ( "./server/model/boletaModel")
const { ObjectId } = require ( "mongodb")

const clientData = {
    _id: new ObjectId("66ac08be701f366205f09d12"),
    nombre: "Miguel",
    telefono: 3244717699,
    email: "miguel.castro@gmail.com",
    targeta_vip: false,
    admin: true
};

async function main() {
    let caso = new Clientes();
    try {
        console.log(await caso.createClientAndUser(clientData));
    } catch (error) {
        console.error('Error en la función principal:', error);
    } finally {
        await caso.close();
    }
}

main()