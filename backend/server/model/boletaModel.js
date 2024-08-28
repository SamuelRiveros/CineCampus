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

    async findExistingTicket(newTicket) {
        try {
          return await this.collection.findOne({
            id_cliente: newTicket.id_cliente,
            columna: newTicket.columna,
            fila: newTicket.fila,
            sala: newTicket.sala,
            id_funcion: newTicket.id_funcion
          });
        } catch (error) {
          console.error('Error finding existing ticket:', error);
          throw new Error('Error finding existing ticket');
        }
    }

    async findClienteById(clienteId) {
    try {
        return await this.clienteColecction.findOne({ _id: new ObjectId(clienteId) });
    } catch (error) {
        console.error('Error finding cliente:', error);
        throw new Error('Error finding cliente');
    }
    }

    async insertTicket(newTicket) {
    try {
        const result = await this.collection.insertOne(newTicket);
        console.log('Ticket inserted successfully');
        return result;
    } catch (error) {
        console.error('Error inserting ticket:', error);
        throw new Error('Error inserting ticket');
    }
    }

    async findFunctionById(funcionId) {
    try {
        return await this.funcionCollection.findOne({
        _id: new ObjectId(funcionId)
        });
    } catch (error) {
        console.error('Error finding function:', error);
        throw new Error('Error finding function');
    }
    }

    async findTicketsByFunctionAndSala(funcionId, sala) {
    try {
        return await this.collection.find({
        id_funcion: funcionId,
        sala: sala
        }).toArray();
    } catch (error) {
        console.error('Error finding tickets:', error);
        throw new Error('Error finding tickets');
    }
    }

    async deleteTicket(deleteseat) {
    try {
        const result = await this.collection.deleteOne(deleteseat);
        console.log('Ticket deleted successfully');
        return result;
    } catch (error) {
        console.error('Error deleting ticket:', error);
        throw new Error('Error deleting ticket');
    }
    }
    
}

module.exports = Boletas