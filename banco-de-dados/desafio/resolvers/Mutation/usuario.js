const database = require("../../knexfile");
const { perfil: obterPerfil } = require("../Query/perfil");
const { usuario: obterUsuario, usuarios } = require("../Query/usuario");

module.exports = {
  async novoUsuario(_, { dados }) {
    try {
      const idsPerfis = [];
      if (dados.perfis) {
        for (let filtro of dados.perfis) {
          const perfil = await obterPerfil(_, {
            filtro,
          });
          if (perfil) idsPerfis.push(perfil.id);
        }
      }

      delete dados.perfis;

      const [id] = await database("usuarios").insert({
        ...dados,
      });

      for (let perfil_id of idsPerfis) {
        await database("usuarios_perfis").insert({ perfil_id, usuario_id: id });
      }

      return database("usuarios").where({ id }).first();
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  },

  async excluirUsuario(_, { filtro }) {
    try {
      const usuario = await obterUsuario(_, { filtro });

      if (usuario) {
        const { id } = usuario;
        await database("usuarios_perfis").where({ usuario_id: id }).delete();
        await database("usuarios").where({ id }).delete();
      }
      return usuario;
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  },

  async alterarUsuario(_, { filtro, dados }) {
    try {
      const usuario = await obterUsuario(_, { filtro });

      if (usuario) {
        const { id } = usuario;
        if (dados.perfis) {
          await database("usuarios_perfis").where({ usuario_id: id }).delete();

          for (let filtro of dados.perfis) {
            const perfil = await obterPerfil(_, {
              filtro,
            });
            perfil &&
              (await database("usuarios_perfis").insert({
                perfil_id: perfil.id,
                usuario_id: id,
              }));
          }
        }

        delete dados.perfis;

        await database("usuarios").where({ id }).update(dados);
      }
      return !usuario ? null : { ...usuario, ...dados };
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  },
};
