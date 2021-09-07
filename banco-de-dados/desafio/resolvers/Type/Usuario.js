const database = require("../../knexfile");

module.exports = {
  async perfis(usuario) {
    return database("perfis")
      .join("usuarios_perfis", "perfis.id", "usuarios_perfis.perfil_id")
      .where({ usuario_id: usuario.id });
  },
};
