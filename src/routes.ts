import { Router } from "express";
import { WalletController } from './Controllers/WalletController';
import { StockController } from './Controllers/StockController';
import { SystemController } from './Controllers/SystemController';

const router = Router();

router.post('/wallets/:wallet_id/stocks/:stock_name', WalletController.manageTrade);
router.get('/wallets/:wallet_id', WalletController.getWallet);
router.get('/wallets/:wallet_id/stocks/:stock_name', WalletController.getStockQuantity); 
router.get('/stocks', StockController.getStocks); 
router.post('/stocks', StockController.setStocks); 
router.get('/log', SystemController.getLogs);
router.post('/chaos', SystemController.chaos);

export default router;