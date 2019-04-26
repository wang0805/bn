-- INSERT INTO clients (name, commission, idb, recap_emails) VALUES ('Theme international', 0.0200, 'S664','cj@tits.com;dc@tits.com');
-- INSERT INTO clients (name, commission, idb, recap_emails) VALUES ('HNK Alpha', 0.0200, 'S664', 'chris@hnk.com;henky@hnk.com');

-- INSERT INTO gcms (code, name) VALUES ('S188', 'UOB Bullion & Futures Ltd');
-- INSERT INTO gcms (code, name) VALUES ('328', 'UBS Futures Singapore ltd');
-- INSERT INTO gcms (code, name) VALUES ('S009', 'SG Securities (Singapore) pte ltd');
-- INSERT INTO gcms (code, name) VALUES ('S020', 'Philips Futures Pte Ltd');

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
