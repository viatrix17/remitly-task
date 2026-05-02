import { Request, Response } from 'express';
import { StockService } from "../Services/StockService";

export class StockController {
    // GET /stocks
    static async getStocks(req: Request, res: Response) {
        try {
            const stocks = await StockService.getStocks();
            
            res.status(200).json({ stocks });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // POST /stocks
    static async setStocks(req: Request, res: Response) {
        try {
            const { stocks } = req.body;

            if (!stocks || !Array.isArray(stocks)) {
                return res.status(400).json({ error: "Format should be { stocks: [] }" });
            }

            await StockService.setStocks(stocks);
            
            res.status(200).send(); 
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}