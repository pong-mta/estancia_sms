export interface Gateway {
    id: number;
    device: string;
    ip: string | null;
    status: "online" | "offline";
    firmware_version: string | null;
    signal: number | null;
    sim_operator: string | null;
    uptime: number;
    free_heap: number;
    queue_status: string;
    last_seen: string | null;
}

export interface Firmware {
    id: number;
    version: string;
    filename: string;
    active: boolean;
    created_at: string;
}

export interface GatewayStats {
    online: number;
    offline: number;
    pending: number;
    sentToday: number;
    firmware: string | null;
}