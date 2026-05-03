import { pool } from "../Infrastructure/db";

export class WalletService {
    static async manageTrade(wallet_id: string, stock_name: string, type: 'buy' | 'sell') {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const checkStock = await client.query(
                'SELECT quantity FROM stocks WHERE stock_name = $1', 
                [stock_name]
            );

            if (checkStock.rowCount === 0) {
                const error: any = new Error('Stock not found');
                error.status = 404;
                throw error;
            }

            const bankQuantity = checkStock.rows[0].quantity;

            if (type === 'buy') {
                if (bankQuantity <= 0) {
                    const error: any = new Error('Stock not available in the bank');
                    error.status = 400;
                    throw error;
                }

                await client.query('UPDATE stocks SET quantity = quantity - 1 WHERE stock_name = $1', [stock_name]);

                await client.query(`
                    INSERT INTO wallets (wallet_id, stock_name, quantity) 
                    VALUES ($1, $2, 1)
                    ON CONFLICT (wallet_id, stock_name) 
                    DO UPDATE SET quantity = wallets.quantity + 1
                `, [wallet_id, stock_name]);

            } else {
                const walletCheckStock = await client.query(
                    'SELECT quantity FROM wallets WHERE wallet_id = $1 AND stock_name = $2',
                    [wallet_id, stock_name]
                );

                if (walletCheckStock.rowCount === 0 || walletCheckStock.rows[0].quantity <= 0) {
                    const error: any = new Error('Stock not found in the wallet');
                    error.status = 400;
                    throw error;
                };

                await client.query('UPDATE stocks SET quantity = quantity + 1 WHERE stock_name = $1', [stock_name]);

                await client.query(
                    'UPDATE wallets SET quantity = quantity - 1 WHERE wallet_id = $1 AND stock_name = $2',
                    [wallet_id, stock_name]
                );
            }

            await client.query(
                'INSERT INTO audit_log (type, wallet_id, stock_name) VALUES ($1, $2, $3)',
                [type, wallet_id, stock_name]
            );
            
            await client.query('COMMIT');
        } catch (error: any) {
            await client.query('ROLLBACK');
            throw error; 
        } finally {
            client.release();
        }
    }

    static async getWallet(wallet_id: string) {
        const result = await pool.query(
            'SELECT stock_name AS name, quantity FROM wallets WHERE wallet_id = $1',
            [wallet_id]
        );
        return result.rows; 
    }

    static async getStockQuantity(wallet_id: string, stock_name: string) {
        const result = await pool.query(
            'SELECT quantity FROM wallets WHERE wallet_id = $1 AND stock_name = $2',
            [wallet_id, stock_name]
        );
        return result.rows.length > 0 ? result.rows[0].quantity : 0;
    }
}