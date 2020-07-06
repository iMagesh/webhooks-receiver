var environment = process.env.NODE_ENV || "development";
var config = require("./knexfile")[environment];
var knex = require("knex")(config);

knex("todos")
  .where("title", "like", "test%")
  .then(result => console.log(result));
