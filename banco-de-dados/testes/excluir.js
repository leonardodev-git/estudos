const database = require("../knexfile");

database("usuarios")
  .delete()
  .then((res) => console.log(res))
  .finally(() => database.destroy());
