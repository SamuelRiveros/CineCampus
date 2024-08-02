const { validationResult } = require('express-validator');
const BoletaModel = require('../model/boletaModel');
const BoletaValidator = require('../validators/boletaValidator');
const BoletaDTO = require('../dto/boletaDTO');

const { ObjectId } = require('mongodb'); 

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
  const boletaDTO = new BoletaDTO();

  try {
    // Convertir IDs a ObjectId
    newTicket.id_cliente = new ObjectId(newTicket.id_cliente);
    // newTicket.id_funcion = new ObjectId(newTicket.id_funcion);

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

exports.listAllBoletas = async (req, res) => {
    // Ejecutar validaciones
    await Promise.all(BoletaValidator.boletaValidationEmpty().map(validator => validator.run(req)));
    
    const boletaModel = new BoletaModel();
    const boletaDTO = new BoletaDTO();
    try{
      const boletas = await boletaModel.listBoletas()

      if (boletas.length === 0) {
        return res.status(404).json(boletaDTO.templateNotBoletas());
      }

      return res.status(200).json(boletaDTO.templateListBoletas(boletas));
    }catch(err){
      return res.status(500).json(boletaDTO.templateBoletaError(err.message));
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