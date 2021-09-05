const database = require("../knexfile");

// database('perfis')
//     .then( res => res.map( p => p.nome))
//     .then(nomes => console.log(nomes))
//     .finally(() => database.destroy())

// database("perfis")
//   .select("nome", "id")
//   .then((res) => console.log(res))
//   .finally(() => database.destroy());

  database("perfis")
  .where('nome', 'like', '%a%')
  .then((res) => console.log(res))
  .finally(() => database.destroy());
