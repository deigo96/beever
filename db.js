const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "brengsek96",
  host: "localhost",
  port: 5432,
  database: "beever",
});

module.exports = pool;
