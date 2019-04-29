const pg = require("pg");
const client = require("./models/client");
const transactions = require("./models/transactions");
const users = require("./models/users");
const url = require("url");

require("dotenv").config();

var configs;

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(":");

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split("/")[1],
    ssl: true
  };
} else {
  configs = {
    // user: "BPI",
    user: "wenhao",
    // password: process.env.DB_PASSWORD,
    host: "127.0.0.1",
    database: "wenhao",
    // database: "BPI",
    port: 5432
  };
}

const pool = new pg.Pool(configs);

pool.on("error", function(err) {
  console.log("idle client error", err.message, err.stack);
});

module.exports = {
  /*
   * ADD APP MODELS HERE
   */
  client: client(pool),
  transactions: transactions(pool),
  users: users(pool),

  //make queries directly from here
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  // get a reference to end the connection pool at server end
  pool: pool
};
