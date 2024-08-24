const Connect = require( "../helper/db/connect")
const { ObjectId } = require ("mongodb")

class Boletas extends Connect {
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
     * @async
     * *Creamos el ticket como usuarios con los datos especificos, este ticket crea un documento en la coleccion "boleta"
     * *También establecemos la fila, la columna, la sala y demás datos para tenerlo listo en el ticket
     * @returns {Promise<Object|String>} - Retorna el resultado de la inserción del ticket en la base de datos.
     *   - Si el ticket ya existe, retorna el ticket existente.
     *   - Si el ticket se inserta correctamente, retorna el resultado de la operación `insertOne`.
     *   - Si ocurre un error, no retorna un valor específico, pero se imprime un mensaje de error en la consola.
     * @throws {error} - nos devuelve error en caso de que no se pueda comprar el ticket por alguna razón
     */

    async BuyATicket(newTicket){

        try {
    
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
        }
    }


    //API para Verificar Disponibilidad de Asientos: Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.

    /**
     * @param {ObjectId} funcionId
     * @param {number} sala
     * *Establecemos los parametros para que puedan ser tratados dentro del método, y llamados en main.js
     * @returns La lista de asientos libres y ocupados por la sala que pedimos en main.js
     */
    
    async seatsReview(funcionId, sala) {
        try {
            // Buscar la función por ID
            const funcion = await this.funcionCollection.findOne({
                _id: new ObjectId(funcionId)
            });
    
            // Si no encuentra la función especificada
            if (!funcion) {
                console.log('No se encontró la función especificada');
                return;
            }
    
            // Buscar las boletas asociadas a la función y sala
            const boletas = await this.collection.find({
                id_funcion: funcion._id,
                sala: sala
            }).toArray();
    
            // Configurar la cantidad de filas y columnas
            const totalFilas = 10;
            const totalColumnas = 26;
            const asientos = Array.from({ length: totalFilas }, () => Array(totalColumnas).fill(0));
    
            // Función para convertir columna de letra a índice numérico
            function columnaAIndice(columna) {
                return columna.charCodeAt(0) - 65; // 'A' tiene el valor 65 en ASCII
            }
    
            // Marcamos los asientos ocupados
            boletas.forEach(boleta => {
                const { fila, columna } = boleta;
                const filaIndex = fila - 1; // Convertir fila a índice basado en 0
                const columnaIndex = columnaAIndice(columna);
                if (filaIndex < totalFilas && columnaIndex < totalColumnas) {
                    asientos[filaIndex][columnaIndex] = 1;
                }
            });
    
            // Creanos un objeto para representar la disponibilidad de asientos
            const asientosDisponibilidad = {};
    
            asientos.forEach((fila, index) => {
                asientosDisponibilidad[`Fila ${index + 1}`] = fila;
            });
    
            // Mostrar los asientos disponibles como objeto
            console.log('Disponibilidad de asientos (0: disponible, 1: ocupado):');
            console.log(asientosDisponibilidad);
    
        } catch (error) {
            console.log("Error al encontrar asientos:", error);
    
        } finally {
            await this.close(); // Cerrar conexión
        }
    }
    
    
    // ----------- Asignación de Asientos, Caso de uso #3 ----------- //
    
    //API para Reservar Asientos: Permitir la selección y reserva de asientos para una proyección específica.

    //* Ya es posible, lo realizamos en el método "BuyATicket", ya que este metodo contiene las propiedades que nos pide la consulta

    //API para Cancelar Reserva de Asientos: Permitir la cancelación de una reserva de asiento ya realizada.

    //* Sabemos que, al cancelar un asiento basicamente cancelamos la ida a la función, por lo tanto podemos eliminar el boleto ingresado, no hay boleto sin un asiento reservado, es lo normal en un cine ( no nos vamos a sentar en el piso 🥵)

    /**
     * @async
     * @returns {object} el documento eliminado que en este caso sería el asiento
     * @throws {error} en caso de que no funcione la cancelacion de asiento
     */
    async cancelSeat(deleteseat){
        try {
            let res = await this.collection.deleteOne(deleteseat)
            console.log("Reserva eliminada correctamente")
            return res;
        } catch(error) {
            console.log("Error al cancelar asiento:", error);
        }
    }

    // ----------- Descuentos y Tarjetas VIP, Caso de uso #4 ----------- //

    //API para Aplicar Descuentos: Permitir la aplicación de descuentos en la compra de boletos para usuarios con tarjeta VIP.

    //* Ya tenemos la validacion lista en "BuyATicket", ya que la idea es que cuando se compre el ticket, se le actualice el precio del ticket

    //API para Verificar Tarjeta VIP: Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.

    //*También está en "BuyaTicket", verificar desde la linea 60
}

module.exports = Boletas