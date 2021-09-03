const database = require("../knexfile");

// const novoPerfil = {
//   nome: "teste",
//   rotulo: "Teste",
// };

// database("perfis")
//   .insert(novoPerfil)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err.sqlMessage))
//   .finally(() => database.destroy());

const perfilSu = {
  nome: "root" + '  ' + Math.random(),
  rotulo: "Super usuário",
};

database
  .insert(perfilSu)
  .into("perfis")
  .then((res) => console.log(res))
  .catch((err) => console.log(err.sqlMessage))
  .finally(() => database.destroy());
