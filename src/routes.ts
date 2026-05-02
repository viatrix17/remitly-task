import { Router } from "express";
import * as WalletController from './Controllers/WalletController';
import * as StockController from './Controllers/StockController';
import * as AuditController from './Controllers/AuditController';

const router = Router();

router.post('/wallet/:wallet_id/stocks/:stock_name', WalletController.trade);
router.get('/wallet/:wallet_id', WalletController.getWallet);
router.get('/wallet/:wallet_id/stocks/:stock_name', WalletController.getStocks); 
router.get('/stocks', StockController.getStocks); 
router.post('/stocks', StockController.addStock); 

export default router;