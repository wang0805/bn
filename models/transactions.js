module.exports = dbPoolInstance => {
  const create = (obj, callback) => {
    const query =
      "INSERT INTO transactions ( trade_date, trade_time, s_client, b_client, s_account, b_account, s_trader, b_trader, s_user, b_user, s_commission, b_commission, price, product, qty, contract, year, created_by_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id;";

    const values = [
      obj.execDate,
      obj.execTime,
      obj.s_client,
      obj.b_client,
      obj.s_accounts,
      obj.b_accounts,
      obj.s_trader,
      obj.b_trader,
      1,
      2,
      parseFloat(obj.s_comms),
      parseFloat(obj.b_comms),
      parseFloat(obj.price),
      obj.product_code,
      parseInt(obj.qty),
      obj.contract,
      parseInt(obj.year),
      1
    ];

    dbPoolInstance.query(query, values, (error, result) => {
      callback(error, result);
    });
  };

  const index = callback => {
    const query = `SELECT * from transactions;`;

    dbPoolInstance.query(query, (error, result) => {
      callback(error, result);
    });
  };

  const indexDay = callback => {
    const query = `SELECT * from transactions where trade_date = current_date;`;

    dbPoolInstance.query(query, (error, result) => {
      callback(error, result);
    });
  };

  return {
    create,
    index,
    indexDay
  };
};
