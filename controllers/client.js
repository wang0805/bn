module.exports = db => {
  const index = (request, response) => {
    db.client.index((error, result) => {
      if (error) {
        console.log("error", error);
        response.sendStatus(500);
      } else {
        // console.log("controller index result rows: ", result.rows);
        // console.log(typeof result.rows, "type of ");

        response.json(result.rows);
      }
    });
  };

  const products = (request, response) => {
    db.client.products((error, result) => {
      if (error) {
        console.log("error", error);
        response.sendStatus(500);
      } else {
        // console.log("controller index result rows: ", result.rows);
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
    index,
    products
  };
};
