-- INSERT INTO clients (name, commission, idb, recap_emails) VALUES ('Theme international', 0.0200, 'S664','cj@tits.com;dc@tits.com');
-- INSERT INTO clients (name, commission, idb, recap_emails) VALUES ('HNK Alpha', 0.0200, 'S664', 'chris@hnk.com;henky@hnk.com');

-- INSERT INTO accounts (account, client_id) VALUES ('SG S188 601011CJ', 1);
-- INSERT INTO accounts (account, client_id) VALUES ('SG S188 601011DC', 1);
-- INSERT INTO accounts (account, client_id) VALUES ('SG S188 601011ZX', 1);
-- INSERT INTO accounts (account, client_id) VALUES ('SG S188 TB681', 2);
-- INSERT INTO accounts (account, client_id) VALUES ('SG S188 TB720', 2);

-- INSERT INTO traders (name, client_id) VALUES ('CJ', 1);
-- INSERT INTO traders (name, client_id) VALUES ('DC', 1);
-- INSERT INTO traders (name, client_id) VALUES ('ZX', 1);
-- INSERT INTO traders (name, client_id) VALUES ('Henky', 2);
-- INSERT INTO traders (name, client_id) VALUES ('Chris', 2);

-- INSERT INTO products (code, name) VALUES ('FEF', 'Iron Ore TSI62 Futures');
-- INSERT INTO products (code, name) VALUES ('FE', 'Iron Ore TSI62 Swaps');

-- INSERT INTO clients_products (client_id, product_id) VALUES (1,1);
-- INSERT INTO clients_products (client_id, product_id) VALUES (1,2);
-- INSERT INTO clients_gcms (gcm_id, client_id) VALUES (1,1);

-- INSERT INTO clients_products (client_id, product_id) VALUES (2,1);
-- INSERT INTO clients_products (client_id, product_id) VALUES (2,2);
-- INSERT INTO clients_gcms (gcm_id, client_id) VALUES (1,2);

-- INSERT INTO users (name, password, permissions) VALUES ("wwh", "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", [user, admin])
-- INSERT INTO users (name, password, permissions) VALUES ("bm", "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", ["user"])

-- INSERT INTO instruments (code, name) VALUES ('F', 'Futures');
-- INSERT INTO instruments (code, name) VALUES ('S', 'Swaps');
-- INSERT INTO instruments (code, name) VALUES ('C', 'Call Options');
-- INSERT INTO instruments (code, name) VALUES ('P', 'Put Options');

