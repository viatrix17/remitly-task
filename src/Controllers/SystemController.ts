import { Request, Response } from 'express';
import { AuditLogService } from "../Services/AuditLogService";
import { AuditLogResponse } from '../Models/AuditLog';

export class SystemController {
    // GET /log
    static async getLogs(req: Request, res: Response) {
        try {
            const logs = await AuditLogService.getLogs();
            const response: AuditLogResponse = { log: logs };
            res.status(200).json(response);
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