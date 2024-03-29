-- CREATE TABLE IF NOT EXISTS products (
-- 	id SERIAL PRIMARY KEY,
-- 	code TEXT,
-- 	name TEXT,
-- 	created_at TIMESTAMP DEFAULT now()
-- );

-- CREATE TABLE IF NOT EXISTS clients (
-- 	id SERIAL PRIMARY KEY,
-- 	name TEXT,
-- 	address TEXT,
-- 	entity TEXT,
-- 	idb TEXT,
-- 	commission NUMERIC(5,4),
-- 	recap_emails TEXT,
-- 	invoice_emails TEXT,
-- 	invoice_freq INT,
-- 	created_at TIMESTAMP DEFAULT now()
-- );

-- CREATE TABLE IF NOT EXISTS traders (
-- 	id SERIAL PRIMARY KEY,
-- 	name TEXT,
--     client_id INT,
-- 	created_at TIMESTAMP DEFAULT now()
-- );

-- CREATE TABLE IF NOT EXISTS accounts (
-- 	id SERIAL PRIMARY KEY,
-- 	account TEXT,
--     client_id INT,
-- 	created_at TIMESTAMP DEFAULT now()
-- );

-- CREATE TABLE IF NOT EXISTS instruments (
-- 	id SERIAL PRIMARY KEY,
-- 	code TEXT,
-- 	name TEXT
-- );

-- CREATE TABLE IF NOT EXISTS transactions (
-- 	id SERIAL PRIMARY KEY,
-- 	trade_date DATE NOT NULL,
-- 	trade_time TEXT,
--  s_client TEXT,
-- 	s_clientid INT,
-- 	b_clientid INT,
-- 	b_client TEXT,
-- 	s_account TEXT,
-- 	b_account TEXT,
-- 	s_idb TEXT,
-- 	b_idb TEXT,
-- 	s_trader TEXT,
-- 	b_trader TEXT,
-- 	s_commission NUMERIC(5,4),
-- 	b_commission NUMERIC(5,4),
-- 	price NUMERIC(5,2),
-- 	strike NUMERIC(5,2),
-- 	product TEXT,
-- 	qty INT,
-- 	contract TEXT,
-- 	instrument TEXT,
-- 	year INT,
-- 	deal_id INT,
-- 	s_user TEXT,
-- 	b_user TEXT,
-- 	created_by_id INT,
-- 	created_at TIMESTAMP DEFAULT now()
-- );

-- CREATE TABLE IF NOT EXISTS users (
-- 	id SERIAL PRIMARY KEY,
-- 	name TEXT,
-- 	password TEXT,
-- 	permissions TEXT [],
-- 	created_at TIMESTAMP DEFAULT now()
-- );

-- CREATE TABLE IF NOT EXISTS invoice (
-- 	id SERIAL PRIMARY KEY,
-- 	entity TEXT,
--     number INT,
-- 	created_at TIMESTAMP DEFAULT now()
-- );

-- ALTER TABLE traders ADD COLUMN telephone int;
-- ALTER TABLE clients ADD COLUMN telephone int;
-- ALTER TABLE transactions ADD COLUMN consMonth INT;
-- ALTER TABLE clients ADD COLUMN dueDate INT;
-- ALTER TABLE clients ADD COLUMN commission_ncf NUMERIC(5,4);
-- ALTER TABLE clients ADD COLUMN commission_st NUMERIC(5,4);
-- ALTER TABLE clients ADD COLUMN commission_sc NUMERIC(5,4);
-- ALTER TABLE transactions ADD COLUMN s_tcomm NUMERIC(7,2);
-- ALTER TABLE transactions ADD COLUMN b_tcomm NUMERIC(7,2);


-- ALTER TABLE transactions ALTER COLUMN price TYPE NUMERIC(9,4);
-- ALTER TABLE clients ALTER COLUMN telephone TYPE varchar(15);
-- ALTER TABLE traders ALTER COLUMN telephone TYPE varchar(15);
-- ALTER TABLE products ADD COLUMN unit TEXT;
-- ALTER TABLE products ADD COLUMN calculation TEXT;
-- ALTER TABLE transactions ADD COLUMN unit TEXT;

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

-- UPDATE transactions SET unit = 'MT';

-- ALTER TABLE transactions ALTER COLUMN s_commission TYPE NUMERIC(7,4);
-- ALTER TABLE transactions ALTER COLUMN b_commission TYPE NUMERIC(7,4);
