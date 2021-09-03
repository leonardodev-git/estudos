const database = require("../knexfile");

async function salvarUsuario(nome, email, senha) {
  let usuario = await database("usuarios").first();

  if (!usuario) {
    let [id] = await database("usuarios").insert({
      nome,
      email,
      senha,
    });

    usuario = await database("usuarios").where({ id }).first();
  } else {
    await database("usuarios")
      .where({ id: usuario.id })
      .update({ nome, email, senha });

    usuario = { ...usuario, nome, email, senha };
  }

  return usuario;
}

async function salvarPerfil(nome, rotulo) {
  let perfil = await database("perfis").where({ nome }).first();

  if (!perfil) {
    let [id] = await database("perfis").insert({
      nome,
      rotulo,
    });

    perfil = await database("perfis").where({ id }).first();
  } else {
    await database("perfis").where({ id: perfil.id }).update({ nome, rotulo });

    perfil = { ...perfil, nome, rotulo };
  }

  return perfil;
}

async function adicionarPerfis(nome, rotulo) {
  const usuario_id = usuario.id;
  await database("usuarios_perfis").where({ usuario_id }).delete();

  for (perfil of perfis) {
    const perfil_id = perfil.id;
    await database("usuarios_perfis").insert({ usuario_id, perfil_id });
  }
}

async function executar() {
  const usuario = await salvarUsuario("Ana", "ana@mail.com", "1234567");
  const perfilA = await salvarPerfil("rh", "pessoal");
  const perfilB = await salvarPerfil("fin", "Financeiro");

  console.log(usuario);
  console.log(perfilA);
  console.log(perfilB);

  await adicionarPerfis(usuario, perfilA, perfilB);
}

executar()
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
