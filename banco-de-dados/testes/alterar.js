const database = require("../knexfile");

const novoUsuario = {
  nome: "Leonardo",
  email: "leo.maga17@gmail.com",
  senha: "1234567",
};

async function exercicio() {
  const qtd = await database("usuarios").count("* as quantidade").first();

  if (qtd === 0) {
    await database("usuarios").insert(novoUsuario);
  }

  let { id } = await database("usuarios").select("id").limit(1).first();

  await database("usuarios").where({ id }).update({ nome: "Pedro" });

  const response = await database("usuarios").where({ id });

  return response;
}

exercicio()
  .then((usuario) => console.log(usuario))
  .finally(() => database.destroy());
