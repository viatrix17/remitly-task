import { Request, Response } from 'express';
import { AuditLogService } from "../Services/AuditLogService";

export class SystemController {
    // GET /log
    static async getLogs(req: Request, res: Response) {
        try {
            const logs = await AuditLogService.getLogs();
            res.status(200).json({ 
                log: logs 
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // POST /chaos
    static async chaos(req: Request, res: Response) {
        console.warn("Chaos endpoint triggered. Killing process...");
        process.exit(1);
    }
}