module.exports = (dbPoolInstance) => {

	const indexbuy = (userid, callback) => {
		
		const queryString = 
		`SELECT users.id, transactions.b_orderid AS buy_orderid, transactions.price AS price, transactions.qty AS qty, transactions.ticker AS ticker, transactions.created_at AS date FROM transactions
		INNER JOIN orders 
		ON (transactions.b_orderid = orders.id)
		INNER JOIN users
		ON (orders.user_id = users.id)
		WHERE orders.user_id = $1;`;
		const values = [userid];

	    dbPoolInstance.query(queryString, values, (error, result) => {
	    
	      callback(error, result);
	  
	    });
	};

	const indexsell = (userid, callback) => {
		
		const queryString = 
		`SELECT users.id, transactions.a_orderid AS sell_orderid, transactions.price AS price, transactions.qty AS qty, transactions.ticker AS ticker, transactions.created_at AS date FROM transactions
		INNER JOIN orders 
		ON (transactions.a_orderid = orders.id)
		INNER JOIN users
		ON (orders.user_id = users.id)
		WHERE orders.user_id = $1;`;
		const values = [userid];

	    dbPoolInstance.query(queryString, values, (error, result) => {
	    
	      callback(error, result);
	  
	    });
	};

	return {
		indexbuy,
		indexsell
	};

};