import { connect } from "../../connect.js";
import { ObjectId } from "mongodb";

export class Boletas extends connect {
    constructor() {
        if (typeof Boletas.instance === "object") {
            return Boletas.instance;
        }
        super();
        this.collection = this.db.collection('boleta');
        this.funcionCollection = this.db.collection('funcion');
        Boletas.instance = this;
        return this;
    }

    // ------ Compra de Boletos, Caso de uso #2 ------ //

    //API para Comprar Boletos: Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.

    /**
     * *Creamos el ticket como usuarios con los datos especificos, este ticket crea un documento en la coleccion "boleta"
     * *También establecemos la fila, la columna, la sala y demás datos para tenerlo listo en el ticket
     */

    async BuyATicket(){

        const newTicket = {
            id_cliente: new ObjectId("60c72b2f5f1b2c001c8e4b7a"), //*Se crea con la id del cliente, en este caso deducimos que es el cliente que ingresa el dato, pero ingresamos la id para establecerlo como admins
            tipo_pago: "online",
            precio: 100,
            columna: "A",
            fila: 5,
            sala: 3,
            id_funcion: new ObjectId("66a595c6f6f7d62733068ac9") //*Indicamos también la id de la funcion, así en el mismo ticket asignamos a que funcion va a ir el cliente
        }

        //!Validación, si el ticket con los datos que se ingresan ya existe, no lo ingresa y nos retorna un "ya existe el ticket"
        const existingTicket = await this.collection.findOne({
            id_cliente: newTicket.id_cliente,
            columna: newTicket.columna,
            fila: newTicket.fila,
            sala: newTicket.sala,
            id_funcion: newTicket.id_funcion
        });

        if (existingTicket) {
            console.log("Ya existe el ticket")
        }

        //* si todo sale bien se inserta el documento correctamente
        let res = await this.collection.insertOne(newTicket)
        console.log("Insertado Correctamente")
        return res;
    }

    //API para Verificar Disponibilidad de Asientos: Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.

    /**
     * @param {ObjectId} funcionId 
     * @param {int} sala 
     * *Establecemos los parametros para que puedan ser tratados dentro del método, y llamados en main.js
     * @returns La lista de asientos libres y ocupados por la sala que pedimos en main.js
     */
    async seatsReview(funcionId, sala) {
        try {
            //* Buscamos la función por ID
            const funcion = await this.funcionCollection.findOne({
                _id: new ObjectId(funcionId)
            });

            //!Si no encuentra la funcion especificada (En main.js) nos loggea esto en consola :

            if (!funcion) {
                console.log('No se encontró la función especificada');
                return;
            }

            //* Buscamos las boletas asociadas a la función y sala
            //* Tenemos en cuenta que el "id_funcion" tiene que ser el mismo que el _id del documento de la coleccion de función , lo ponemos así por que se refiere a la "funcionID" que ponemos en el main.js , y tiene que estar así en el documento por que de lo contrario no lo encontraría

            const boletas = await this.collection.find({
                id_funcion: funcion._id,
                sala: sala
            }).toArray();

            //* Configuramos la cantidad de filas y columnas
            //! Tenemos un minimo de 0 y un maximo de 10 filas en mongo, si agregamos más filas nos retorna error

            const totalFilas = 10;
            const totalColumnas = 26;
            const asientos = Array.from({ length: totalFilas }, () => Array(totalColumnas).fill(0));

            //* Función para convertir columna de letra a índice numérico
            //* Manejamos indices numericos para que el codigo reconozca las letras como numeros, ya que estamos manejando las columnas como letras

            function columnaAIndice(columna) {
                return columna.charCodeAt(0) - 65; //* 'A' tiene el valor 65 en ASCII
            }

            //* Marcar los asientos ocupados
            boletas.forEach(boleta => {
                const { fila, columna } = boleta;
                const columnaIndex = columnaAIndice(columna);
                if (fila < totalFilas && columnaIndex < totalColumnas) {
                    asientos[fila][columnaIndex] = 1;
                }
            });

            // Mostramos los asientos disponibles
            console.log('Disponibilidad de asientos (0: disponible, 1: ocupado):');

            //* iteramos entre cada fila y hacemos un console.log de "fila:" y la fila que es, asi´nos ordenamos mejor para que el usuario entienda
            asientos.forEach((fila, index) => {
                console.log(`Fila ${index + 1}: ${fila.join(' ')}`);
            });


        } catch (error) {
            console.log("Error al encontrar asientos:", error);

        } finally {
            await this.close(); //* Cerramos conexión
        }
    }
    

    /**
     * *Solo un testeo de que la llamada de las funciones están funcionando
     * @returns todos los documentos de las funciones que hay en la coleccion "funcion"
     */

    async testfunciones(){
        let res = await this.funcionCollection.find({}).toArray()
        await this.close()
        return res;
    } 
    
    
}