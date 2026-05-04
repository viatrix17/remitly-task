import { pool } from "../Infrastructure/db";

export class StockService {
    static async getStocks() {
        const result = await pool.query(
            'SELECT stock_name AS name, quantity FROM stocks ORDER BY stock_name'
        );
        return result.rows;
    }

    static async setStocks(stocks: { name: string; quantity: number }[]) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            for (const stock of stocks) {
                await client.query(
                    `INSERT INTO stocks (stock_name, quantity) 
                    VALUES ($1, $2) 
                    ON CONFLICT (stock_name) 
                    DO UPDATE SET quantity = EXCLUDED.quantity`,
                    [stock.name, stock.quantity]
                );
            }
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}