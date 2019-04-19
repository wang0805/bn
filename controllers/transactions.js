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

  const index = (request, response) => {
    db.transactions.index((error, result) => {
      if (error) {
        console.log("error", error);
        response.sendStatus(500);
      } else {
        // console.log(
        //   "controller index result rows of transactions: ",
        //   result.rows
        // );
        // console.log(typeof result.rows, "type of ");

        response.json(result.rows);
      }
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */

  return {
    create,
    index
  };
};
