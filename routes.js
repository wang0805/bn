module.exports = (app, db) => {
  const client = require("./controllers/client")(db);
  const transactions = require("./controllers/transactions")(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  // CRUD
  app.get("/api/clients", client.index);
  app.get("/api/products", client.products);

  app.post("/api/transactions", transactions.create);
};

/*
  routes.js export to index.js 
  models export to db.js
  controllers import from db.js to call db.model.action
  controllers exports to routes
*/
