import { Request, Response } from "express";
import { WalletService } from "../Services/WalletService";

export class WalletController {
    // POST /wallet/:wallet_id/stocks/:stock_name
    static async manageTrade(req: Request, res: Response) {

        const wallet_id = req.params.wallet_id as string;
        const stock_name = req.params.stock_name as string;
        const { type } = req.body;

        try {
            await WalletService.manageTrade(wallet_id, stock_name, type);
            res.status(200).send();
        } catch (error: any) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    // GET /wallet/:wallet_id
    static async getWallet(req: Request, res: Response) {
        const wallet_id = req.params.wallet_id as string;
        try {
            const stocks = await WalletService.getWallet(wallet_id);
            res.status(200).json({
                id: wallet_id,
                stocks: stocks
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET /wallet/:wallet_id/stocks/:stock_name
    static async getStockQuantity(req: Request, res: Response) {
        const wallet_id = req.params.wallet_id as string;
        const stock_name = req.params.stock_name as string;
        try {
            const quantity = await WalletService.getStockQuantity(wallet_id, stock_name);
            res.status(200).send(quantity.toString());
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}