exports.up = function(knex) {
  return knex.schema.createTable("todos", table => {
    table.increments("id");
    table.string("title");
    table.text("description");
    table.integer("priority");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("todos");
};
