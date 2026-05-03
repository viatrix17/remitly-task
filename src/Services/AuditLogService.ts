import { pool } from '../Infrastructure/db';

export class AuditLogService {
    static async getLogs() {
        const logs = await pool.query('SELECT * FROM audit_log ORDER BY timestamp DESC');
    }

    static async chaos(req: Request, res: Response) {
        process.exit(1);
    }
}