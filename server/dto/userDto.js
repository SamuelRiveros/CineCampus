module.exports = class UsuarioDTO {
  typeToRole(arg){
      if(arg.tipo == "Admin"){
          arg.tipo = "Administrador"
      } else if(arg.tipo == "Estandar"){
          arg.tipo = "usuarioEstandar"
      } else if(arg.tipo == "VIP"){
          arg.tipo = "usuarioVIP"
      }
      return {
          ...arg,
          tipo: arg.tipo
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
          data: arg
      }
  }

  templateUserSaved(arg){
      return {
          status: 201,
          data: arg
      }
  }

  templateListUsers(arg){
      return {
          status: 200,
          data: arg
      }
  }
}