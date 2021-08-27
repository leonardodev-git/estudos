// Update with your config settings.
module.exports = {
  client: "mysql",
  connection: {
    host: '172.17.0.1',
    database: "exercicios",
    user: "root",
    password: "1234567",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
