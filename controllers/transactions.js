module.exports = db => {
  const create = (request, response) => {
    // console.log("create transactions request:", request.body);
    db.transactions.create(request.body, (error, result) => {
      if (error) {
        console.error("error: ", error);
        response.sendStatus(500);
      } else {
        response.json(result.rows);
        // response.send("success inserting into transactions!");
      }
    });
  };

  const index = (req, res) => {
    db.transactions.index((error, result) => {
      if (error) {
        console.log("error", error);
        res.sendStatus(500);
      } else {
        // console.log(
        //   "controller index result rows of transactions: ",
        //   result.rows
        // );
        // console.log(typeof result.rows, "type of ");

        res.json(result.rows);
      }
    });
  };

  const indexDay = (req, res) => {
    db.transactions.indexDay((error, result) => {
      if (error) {
        console.log("error", error);
        res.sendStatus(500);
      } else {
        // console.log(
        //   "controller index result rows of transactions: ",
        //   result.rows
        // );
        // console.log(typeof result.rows, "type of ");

        res.json(result.rows);
      }
    });
  };

  const edit = (request, response) => {
    //let user_id = request.cookies.user_id;
    let trade_id = request.params.id;

    db.transactions.edit(trade_id, (error, result) => {
      if (error) {
        console.log("error", error);
        response.sendStatus(500);
      } else {
        response.json(result.rows[0]);
        // console.log("results of edit", result.rows[0]);
      }
    });
  };

  const update = (req, response) => {
    db.transactions.update(req.body, (error, result) => {
      if (error) {
        console.log("error", error);
        response.sendStatus(500);
      } else {
        response.json(result.rows[0]);
        // console.log("results of edit", result.rows[0]);
      }
    });
  };

  const indexInvoice = (req, res) => {
    db.transactions.indexInvoice((error, result) => {
      if (error) {
        console.log("error", error);
        res.sendStatus(500);
      } else {
        // console.log(
        //   "controller index result rows of transactions: ",
        //   result.rows
        // );
        // console.log(typeof result.rows, "type of ");

        res.json(result.rows);
      }
    });
  };

  const updateInvoice = (req, response) => {
    db.transactions.updateInvoice(req.body, (error, result) => {
      if (error) {
        console.log("error", error);
        response.sendStatus(500);
      } else {
        response.send("sucecssful in updating invoice");
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
    index,
    indexDay,
    edit,
    update,
    indexInvoice,
    updateInvoice
  };
};
