module.exports = (app, db) => {
  const client = require("./controllers/client")(db);

  /*
   *  =========================================
   *  Users
   *  =========================================
   */

  // CRUD
  app.get("/api/clients", client.index);
};

/*
  routes.js export to index.js 
  models export to db.js
  controllers import from db.js to call db.model.action
  controllers exports to routes
*/
