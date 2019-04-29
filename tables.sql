CREATE TABLE IF NOT EXISTS products (
	id SERIAL PRIMARY KEY,
	code TEXT,
	name TEXT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
	id SERIAL PRIMARY KEY,
	name TEXT,
	idb TEXT,
	commission NUMERIC(5,4),
	recap_emails TEXT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS traders (
	id SERIAL PRIMARY KEY,
	name TEXT,
    client_id INT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS accounts (
	id SERIAL PRIMARY KEY,
	account TEXT,
    client_id INT,
	created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE IF NOT EXISTS transactions (
	id SERIAL PRIMARY KEY,
	trade_date DATE NOT NULL,
	trade_time TEXT,
    s_client TEXT,
	b_client TEXT,
	s_account TEXT,
	b_account TEXT,
	s_idb TEXT,
	b_idb TEXT,
	s_trader TEXT,
	b_trader TEXT,
	s_commission NUMERIC(5,4),
	b_commission NUMERIC(5,4),
	price NUMERIC(5,2),
	product TEXT,
	qty INT,
	contract TEXT,
	year INT,
	deal_id INT,
	s_user INT,
	b_user INT,
	created_by_id INT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT,
	permissions TEXT [],
	created_at TIMESTAMP DEFAULT now()
);

-- SELECT clients.id, clients.name, products.code, products.name, gcms.code, gcms.name, accounts.account, traders.name from clients 
-- inner join clients_products 
-- on clients_products.client_id = clients.id
-- inner join products 
-- on clients_products.product_id = products.id
-- inner join clients_gcms
-- on clients_gcms.client_id = clients.id
-- inner join gcms
-- on clients_gcms.gcm_id = gcms.id
-- inner join accounts
-- on accounts.client_id = clients.id
-- inner join traders
-- on traders.client_id= clients.id

