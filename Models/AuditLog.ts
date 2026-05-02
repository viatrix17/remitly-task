export interface AuditLogEntry {
    type: "buy" | "sell";
    wallet_id: string;
    stock_name: string;
}

export interface AuditLogResponse {
    log: AuditLogEntry[];
}