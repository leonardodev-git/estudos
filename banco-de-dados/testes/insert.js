const database = require('../knexfile')

const novoPerfil = {
  nome: "teste",
  rotulo: "Teste",
};

database("perfis")
  .insert(novoPerfil)
  .then(res => console.log(res));
