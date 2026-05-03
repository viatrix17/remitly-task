export interface Stock {
    name: string;
    quantity: number;
}

export interface StockResponse {
    stocks: Stock[];
}