module.exports = class boletaDTO {
  
    templateNotBoletas(){
        return {
            status: 404,
            message: "No hay boletas compradas"
        }
    }
  
    templateBoletaError(arg){
        return {
            status: 500,
            message: "Ocurrio un error",
            data: arg
        }
    }
  
    templateBoletaSaved(arg){
        return {
            status: 201,
            data: arg
        }
    }
  
    templateListBoletas(arg){
        return {
            status: 200,
            data: arg
        }
    }

    templateBoletaExists(){
        return {
            status: 409,
            message: "El ticket ya existe"
        }
    }
  }