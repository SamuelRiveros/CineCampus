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
        this.clienteColecction = this.db.collection('cliente')
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

        try {
            const newTicket = {
                id_cliente: new ObjectId("66a5ad90f6f7d62733068acc"), //*Se crea con la id del cliente, en este caso deducimos que es el cliente que ingresa el dato, pero ingresamos la id para establecerlo como admins
                tipo_pago: "online",
                precio: 100,
                columna: "A",
                fila: 5, // Tener en cuenta el lugar que se le da a esa persona en la sala
                sala: 2,
                id_funcion: new ObjectId("66a595c6f6f7d62733068ac9") //*Indicamos también la id de la funcion, así en el mismo ticket asignamos a que funcion va a ir el cliente
            }
    
            //* Validación, si el ticket con los datos que se ingresan ya existe, no lo ingresa y nos retorna un "ya existe el ticket"

            const existingTicket = await this.collection.findOne({
                id_cliente: newTicket.id_cliente,
                columna: newTicket.columna,
                fila: newTicket.fila,
                sala: newTicket.sala,
                id_funcion: newTicket.id_funcion
            });
    
            if (existingTicket) {
                console.log("Ya existe el ticket, es el siguiente :")
                return existingTicket;
            }
            
            //! Aqui validamos si el usuario es vip o no, y se le inserta una oferta al precio si lo es, si no lo es, nos dice que no es vip

            const usuariocheck = await this.clienteColecction.findOne({
                _id: newTicket.id_cliente
            });
    
            if (usuariocheck.targeta_vip === true) {
                console.log("Es vip, se le asigna la oferta del 50% !")
                newTicket.precio *= 0.5
    
            } else if(usuariocheck.targeta_vip === false) {
                console.log("No es vip, no se le da una oferta")
            }
            //* si todo sale bien se inserta el documento correctamente
            let res = await this.collection.insertOne(newTicket)
    
            
            console.log("Insertado Correctamente")
            return res;
        } catch(error){
            console.log(`error al comprar ticket: ${error}`)
        } finally { await this.close() }
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
    
    // ----------- Asignación de Asientos, Caso de uso #3 ----------- //
    
    //API para Reservar Asientos: Permitir la selección y reserva de asientos para una proyección específica.

    //* Ya es posible, lo realizamos en el método "BuyATicket", ya que este metodo contiene las propiedades que nos pide la consulta

    //API para Cancelar Reserva de Asientos: Permitir la cancelación de una reserva de asiento ya realizada.

    //* Sabemos que, al cancelar un asiento basicamente cancelamos la ida a la función, por lo tanto podemos eliminar el boleto ingresado, no hay boleto sin un asiento reservado, es lo normal en un cine ( no nos vamos a sentar en el piso 🥵)

    async cancelSeat(){
        try {
            let res = await this.collection.deleteOne({"_id" : new ObjectId("66a5b4ed51b8bc807e8a6b5a")})
            console.log("Reserva eliminada correctamente")
            return res;
        } catch(error) {
            console.log("Error al cancelar asiento:", error);
        } finally {
            await this.conexion.close()
        }
    }

    // ----------- Descuentos y Tarjetas VIP, Caso de uso #4 ----------- //

    //API para Aplicar Descuentos: Permitir la aplicación de descuentos en la compra de boletos para usuarios con tarjeta VIP.

    //* Ya tenemos la validacion lista en "BuyATicket", ya que la idea es que cuando se compre el ticket, se le actualice el precio del ticket

    //API para Verificar Tarjeta VIP: Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.

    //*También está en "BuyaTicket", verificar desde la linea 60
}