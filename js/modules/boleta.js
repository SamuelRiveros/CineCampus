import { connect } from "../../connect.js";
import { ObjectId } from "mongodb";

export class Boletas extends connect {
    constructor() {
        if (typeof Boletas.instance === "object") {
            return Boletas.instance;
        }
        super();
        this.collection = this.db.collection('boleta');
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

    async seatsReview() {
        
    }
}