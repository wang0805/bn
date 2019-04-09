module.exports = dbPoolInstance => {
  const index = callback => {
    const query = "SELECT * FROM clients;";

    dbPoolInstance.query(query, (error, result) => {
      callback(error, result);
    });
  };

  return {
    index
  };
};
