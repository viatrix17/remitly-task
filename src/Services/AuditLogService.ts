import { pool } from "../Infrastructure/db";

export class AuditLogService {
    static async getLogs() {
        const result = await pool.query(
            'SELECT type, wallet_id, stock_name FROM audit_log ORDER BY id ASC'
        );
        return result.rows;
    }
}