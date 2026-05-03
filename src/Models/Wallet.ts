export interface WalletEntry {
    wallet_id: string;
    stock_name: string;
    quantity: number;
}

export interface WalletResponse {
    id: string;
    stocks: {
        name: string;
        quantity: number;
    }[];
}