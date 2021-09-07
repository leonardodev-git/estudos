const database = require("../../knexfile");

module.exports = {
   usuarios() {
    return database("usuarios");
  },
   usuario(_, { filtro }) {
    if (!filtro) return null;
    const { id, email } = filtro;
    if (id) {
      return database("usuarios").where({ id }).first();
    } else if (email) {
      return database("usuarios").where({ email }).first();
    } else {
      return null;
    }
  },
};
