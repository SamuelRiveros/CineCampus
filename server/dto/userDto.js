class UserDTO {
  constructor({ nombre, email, contrasena }) {
    this.n = nombre;
    this.e = email;
    this.c = contrasena;
  }
}

module.exports = UserDTO;