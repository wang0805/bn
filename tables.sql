CREATE TABLE IF NOT EXISTS gcms (
	id SERIAL PRIMARY KEY,
	code TEXT,
	name TEXT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
	id SERIAL PRIMARY KEY,
	code TEXT,
	name TEXT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
	id SERIAL PRIMARY KEY,
	code TEXT,
	name TEXT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dates (
	id SERIAL PRIMARY KEY,
	month TEXT,
    monthno INT,
	year INT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
	id SERIAL PRIMARY KEY,
	name TEXT,
    gcm_id INT,
	account TEXT,
    trader TEXT,
	created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients_products (
	id SERIAL PRIMARY KEY,
    client_id INT,
    product_id INT,
	created_at TIMESTAMP DEFAULT now()
);
