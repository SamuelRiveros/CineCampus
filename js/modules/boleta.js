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

    async BuyATicket(){

        const newTicket = {
            id_cliente: new ObjectId("60c72b2f5f1b2c001c8e4b7a"),
            tipo_pago: "online",
            precio: 100,
            columna: "A",
            fila: 5,
            sala: 3,
            id_funcion: new ObjectId("60c72b315f1b2c001c8e4b7b")
        }

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

        let res = await this.collection.insertOne(newTicket)
        console.log("Insertado Correctamente")
        return res;
    }

    //API para Verificar Disponibilidad de Asientos: Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.
    //consulta para Verificar Disponibilidad de Asientos: Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.

    async seatsReview(peliculaId, horarioProyeccion, sala) {

        try {
            const funcion = await this.funcionCollection.findOne({
                Pelicula_id: peliculaId,
                horario_proyeccion: horarioProyeccion
              });
    
            if (!funcion) {
            console.log('No se encontró la función especificada');
            return;
            }
    
            const boletas = await this.collection.find({
                id_funcion: funcion._id,
                sala: sala
              }).toArray();
    
            const totalFilas = 10
            const totalColumnas = 26
            const asientosTotales = totalFilas * totalColumnas
    
            const asientos = Array.from({ length: totalFilas }, () => Array(totalColumnas).fill(0));
    
            // Función para convertir columna de letra a índice numérico
            function columnaAIndice(columna) {
            return columna.charCodeAt(0) - 65; // 'A' tiene el valor 65 en ASCII
            }

            // Marcar los asientos ocupados
            boletas.forEach(boleta => {
                const { fila, columna } = boleta;
                const columnaIndex = columnaAIndice(columna);
                asientos[fila][columnaIndex] = 1;
            });
        
            // Mostrar los asientos disponibles
            console.log('Disponibilidad de asientos (0: disponible, 1: ocupado):');
            console.log(asientos);
        
            // Puedes devolver los asientos disponibles si es necesario
            return asientos;
            } catch(error){
                console.log("Error al encontrar asientos")
            }
    }

    /**
     * *Solo un testeo de que la llamada de las funciones están funcionando
     * @returns 
     */
    async testfunciones(){
        let res = await this.funcionCollection.find({}).toArray()
        return res;
    }

}