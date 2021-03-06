const middleware = require("./middleware");
const guard = require("express-jwt-permissions")();

module.exports = (app, db) => {
  const client = require("./controllers/client")(db);
  const transactions = require("./controllers/transactions")(db);
  const users = require("./controllers/users")(db);
  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  // CRUD
  app.post("/users/login", users.login);

  app.get(
    "/api/clients",
    middleware.checkToken,
    guard.check("user"),
    client.index
  );
  app.get("/api/products", client.products);
  app.get("/api/instruments", client.instruments);

  app.get(
    "/api/transactionss",
    middleware.checkToken,
    guard.check("admin"),
    transactions.index
  );
  app.get(
    "/api/transactions",
    middleware.checkToken,
    guard.check("user"),
    transactions.indexDay
  );
  app.get("/api/invoice", transactions.indexInvoice);
  app.get("/api/users", users.index);
  app.get("/api/transactions/:id", transactions.edit);

  app.post("/api/transactions", transactions.create);
  app.post("/api/transactions/:id", transactions.update);
  app.post("/api/invoice", transactions.updateInvoice);
  app.post("/users/create", users.create);
  app.post("/users/logout", users.logout);
};

/*
  routes.js export to index.js 
  models export to db.js
  controllers import from db.js to call db.model.action
  controllers exports to routes
*/
