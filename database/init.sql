CREATE TABLE IF NOT EXISTS stocks (
    stock_name TEXT PRIMARY KEY,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0)
);

CREATE TABLE IF NOT EXISTS wallets (
    wallet_id TEXT NOT NULL,
    stock_name TEXT NOT NULL REFERENCES stocks(stock_name),
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    PRIMARY KEY (wallet_id, stock_name)
);


CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('buy', 'sell')),
    wallet_id TEXT NOT NULL,
    stock_name TEXT NOT NULL
);

-- TEST DATA
INSERT INTO stocks (stock_name, quantity) VALUES 
('Apple', 1000), 
('Tesla', 500), 
('Bitcoin', 10);

INSERT INTO wallets (wallet_id, stock_name, quantity) 
VALUES ('user_1', 'Apple', 10);

INSERT INTO wallets (wallet_id, stock_name, quantity) 
VALUES ('user_2', 'Apple', 5);

INSERT INTO wallets (wallet_id, stock_name, quantity) 
VALUES ('user_2', 'Tesla', 2);

INSERT INTO wallets (wallet_id, stock_name, quantity) 
VALUES ('whale_account', 'Bitcoin', 8);