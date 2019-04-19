module.exports = dbPoolInstance => {
  const index = callback => {
    const query = `SELECT clients.id, clients.commission AS commission, clients.name AS client_name, clients.recap_emails AS recap_emails, products.code AS product_code, products.name AS product_name, gcms.code AS gcm_code, gcms.name AS gcm_name, accounts.account, traders.name AS trader_name from clients
    inner join clients_products
    on clients_products.client_id = clients.id
    inner join products
    on clients_products.product_id = products.id
    inner join clients_gcms
    on clients_gcms.client_id = clients.id
    inner join gcms
    on clients_gcms.gcm_id = gcms.id
    inner join accounts
    on accounts.client_id = clients.id
    inner join traders
    on traders.client_id= clients.id;`;

    dbPoolInstance.query(query, (error, result) => {
      callback(error, result);
    });
  };

  const products = callback => {
    const query = `SELECT code, name from products;`;

    dbPoolInstance.query(query, (error, result) => {
      callback(error, result);
    });
  };

  return {
    index,
    products
  };
};
