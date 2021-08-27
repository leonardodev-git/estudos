
exports.up = function(knex) {
    return knex.schema.createTable('perfis', table => {
        table.increments('id').primary()
        table.string('nome').notNull().unique()
        table.string('rotulo').notNull()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('perfis')
};
