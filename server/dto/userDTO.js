module.exports = class UsuarioDTO {

    templateUserSaved(arg){
        return {
            status: 201,
            data: arg,
            message: "Usuario guardado"
        }
    }

  templateNotUsers(){
      return {
          status: 404,
          message: "No hay usuarios registrados"
      }
  }

  templateUserError(arg){
      return {
          status: 500,
          message: "Ocurrio un error",
          data: arg
      }
  }

  templateExistUser(arg){
      return {
          status: 200,
          data: arg,
          message: "Usuario Ya existe"
      }
  }


  templateListUsers(arg){
      return {
          status: 200,
          data: arg
      }
  }
}