const database = require("../../knexfile");

module.exports = {
  async perfis() {
    return database("perfis");
  },
  async perfil(_, { filtro }) {
    if (!filtro) return null;
    const { id, nome } = filtro;
    if (id) {
      return database("perfis").where({ id }).first();
    } else if (nome) {
      return database("perfis").where({ nome }).first();
    } else {
      return null;
    }
  },
};
