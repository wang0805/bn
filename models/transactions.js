module.exports = dbPoolInstance => {
  const create = (obj, callback) => {
    console.log(obj, obj.execDate, "date pls");
    const query = `INSERT INTO transactions ( s_clientid, b_clientid, strike, instrument, trade_date, 
        trade_time, s_client, b_client, s_account, b_account, s_trader, b_trader, s_user, b_user, 
        s_commission, b_commission, s_idb, b_idb, price, product, qty, contract, year, created_by_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 
          $18, $19, $20, $21, $22, $23, $24) RETURNING id;`;

    const values = [
      obj.s_client_id,
      obj.b_client_id,
      parseFloat(obj.strike),
      obj.instrument,
      obj.execDate,
      obj.execTime,
      obj.s_client,
      obj.b_client,
      obj.s_accounts,
      obj.b_accounts,
      obj.s_trader,
      obj.b_trader,
      obj.s_broker,
      obj.b_broker,
      parseFloat(obj.s_comms),
      parseFloat(obj.b_comms),
      obj.s_idb,
      obj.b_idb,
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
    const query = `SELECT transactions.id AS trade_id, transactions.strike, transactions.instrument, transactions.product, 
    transactions.trade_date, transactions.trade_time, transactions.s_client, transactions.b_client, transactions.s_account, 
    transactions.b_account, transactions.b_trader, transactions.s_trader, transactions.s_commission, transactions.b_commission, 
    transactions.s_idb, transactions.b_idb, transactions.price, transactions.qty, transactions.contract, transactions.year, 
    transactions.deal_id, transactions.s_user, transactions.b_user, transactions.created_at, users.name AS created_by from transactions 
    inner join users
    on users.id = transactions.created_by_id
    ORDER BY trade_id DESC;`;

    dbPoolInstance.query(query, (error, result) => {
      callback(error, result);
    });
  };

  const indexDay = callback => {
    const query = `SELECT transactions.id AS trade_id, transactions.strike, transactions.instrument, transactions.trade_date, transactions.trade_time, 
    transactions.product, transactions.s_client, transactions.b_client, transactions.s_account, transactions.b_account, transactions.b_trader, 
    transactions.s_trader, transactions.s_commission, transactions.b_commission, transactions.s_idb, transactions.b_idb, transactions.price, 
    transactions.qty, transactions.contract, transactions.year, transactions.deal_id, transactions.s_user, transactions.b_user, transactions.created_at, 
    users.name AS created_by from transactions 
    inner join users
    on users.id = transactions.created_by_id 
    where transactions.trade_date = current_date
    ORDER BY trade_id ASC;`;

    dbPoolInstance.query(query, (error, result) => {
      callback(error, result);
    });
  };

  const edit = (tradeid, callback) => {
    const query = `SELECT * from transactions WHERE id=$1;`;

    values = [tradeid];

    dbPoolInstance.query(query, values, (error, result) => {
      callback(error, result);
    });
  };

  const update = (obj, callback) => {
    const query = `update transactions SET deal_id=$1 WHERE id=$2;`;

    values = [obj.dealid, obj.tradeid];

    dbPoolInstance.query(query, values, (error, result) => {
      callback(error, result);
    });
  };

  return {
    create,
    index,
    indexDay,
    edit,
    update
  };
};
