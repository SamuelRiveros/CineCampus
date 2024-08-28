const { validationResult } = require('express-validator');
const BoletaModel = require('../model/boletaModel');
const BoletaValidator = require('../validators/boletaValidator');
const BoletaDTO = require('../dto/boletaDTO');

exports.buyTicket = async (req, res) => {
    // Ejecutar validaciones
    await Promise.all(BoletaValidator.validateNewTicket().map(validator => validator.run(req)));
    
    // Manejar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newTicket = req.body;
    const boletaModel = new BoletaModel();
    const boletaDTO = new BoletaDTO()

    try {
        // Verificar si el ticket ya existe
        const existingTicket = await boletaModel.findExistingTicket(newTicket);
        if (existingTicket) {
            return res.status(409).json(boletaDTO.templateBoletaError('Ya existe el ticket'));
        }

        // Verificar si el cliente es VIP
        const cliente = await boletaModel.findClienteById(newTicket.id_cliente);

        if (cliente.targeta_vip) {
            newTicket.precio *= 0.5; // Aplicar descuento
        }

        // Insertar el nuevo ticket
        const result = await boletaModel.insertTicket(newTicket);
        return res.status(201).json(boletaDTO.templateBoletaSaved(result));
    } catch (error) {
        console.error('Error al comprar ticket:', error);
        return res.status(500).json(boletaDTO.templateBoletaError(error.message));
    }
};

exports.reviewSeats = async (req, res) => {
    // Ejecutar validaciones
    await Promise.all(BoletaValidator.validateFuncionExists().map(validator => validator.run(req)));
    
    // Manejar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { funcionId, sala } = req.params;
    const boletaModel = new BoletaModel();
    const boletaDTO = new BoletaDTO()

    try {
        // Validar que la función exista
        const funcion = await boletaModel.findFunctionById(funcionId);
        if (!funcion) {
            return res.status(404).json(boletaDTO.templateBoletaError('Función no encontrada'));
        }

        // Obtener los tickets asociados a la función y sala
        const tickets = await boletaModel.findTicketsByFunctionAndSala(funcionId, sala);

        // Configurar la matriz de asientos
        const totalFilas = 10;
        const totalColumnas = 26;
        const asientos = Array.from({ length: totalFilas }, () => Array(totalColumnas).fill(0));

        tickets.forEach(ticket => {
            const filaIndex = ticket.fila - 1;
            const columnaIndex = ticket.columna.charCodeAt(0) - 65;
            if (filaIndex < totalFilas && columnaIndex < totalColumnas) {
                asientos[filaIndex][columnaIndex] = 1;
            }
        });

        return res.status(200).json(boletaDTO.templateListBoletas(asientos));
    } catch (error) {
        console.error('Error al revisar los asientos:', error);
        return res.status(500).json(boletaDTO.templateBoletaError(error.message));
    }
};

exports.cancelTicket = async (req, res) => {
    const deleteseat = req.body;
    const boletaModel = new BoletaModel();
    const boletaDTO = new BoletaDTO()
    

    try {
        const result = await boletaModel.deleteTicket(deleteseat);
        return res.status(200).json(boletaDTO.templateBoletaSaved(result));
    } catch (error) {
        console.error('Error al cancelar el ticket:', error);
        return res.status(500).json(boletaDTO.templateBoletaError(error.message));
    }
};
