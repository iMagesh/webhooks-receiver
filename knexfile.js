// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "scratch_todos"
      // user: "usernam",
      // password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
