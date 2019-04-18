module.exports = dbPoolInstance => {
  const create = (obj, callback) => {
    console.log(obj, "objsctsdsdsdsdsdsds");
    const query =
      "INSERT INTO transactions ( trade_date, trade_time, s_client, b_client, s_user, b_user, s_commission, b_commission, price, product, qty, contract, year, created_by_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id;";

    const values = [
      obj.execDate,
      obj.execTime,
      obj.s_client,
      obj.b_client,
      1,
      2,
      parseFloat(obj.s_comms),
      parseFloat(obj.b_comms),
      parseFloat(obj.price),
      obj.product_code,
      parseInt(obj.qty),
      "contract",
      parseInt(obj.year),
      1
    ];

    dbPoolInstance.query(query, values, (error, result) => {
      callback(error, result);
    });
  };

  return {
    create
  };
};
