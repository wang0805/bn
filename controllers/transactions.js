module.exports = db => {
  const create = (request, response) => {
    // console.log("create transactions request:", request.body);
    db.transactions.create(request.body, (error, result) => {
      if (error) {
        console.error("error: ", error);
        response.sendStatus(500);
      } else {
        response.send("success inserting into transactions!");
      }
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */

  return {
    create
  };
};
