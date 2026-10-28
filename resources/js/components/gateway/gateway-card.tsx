import {
    Wifi,
    WifiOff,
    Signal,
    Cpu,
    MemoryStick,
    Clock,
    RotateCcw,
    Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Gateway } from "./types";
import axios from "axios";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

interface Props {
    gateway: Gateway;
}

export default function GatewayCard({ gateway }: Props) {
    const online = gateway.status === "online";

    function formatUptime(seconds: number) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }

    function formatHeap(bytes: number) {
        return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return (
        <div 
        className="rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
        onClick={() => router.visit(`/gateway-manager/${gateway.device}`)}
        >

            <div className="flex items-center justify-between border-b p-5">

                <div>

                    <h2 className="text-sm font-bold">
                        {gateway.device}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {gateway.ip ?? "No IP Address"}
                    </p>

                </div>

                <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                        online
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {online ? (
                        <Wifi className="h-4 w-4" />
                    ) : (
                        <WifiOff className="h-4 w-4" />
                    )}

                    {online ? "Online" : "Offline"}
                </div>

            </div>

            <div className="grid grid-cols-2 gap-4 p-5 text-sm">

                <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-violet-500" />
                    <span>v{gateway.firmware_version ?? "-"}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Signal className="h-4 w-4 text-green-500" />
                    <span>{gateway.signal ?? "--"} dBm</span>
                </div>

                <div className="flex items-center gap-2">
                    <MemoryStick className="h-4 w-4 text-blue-500" />
                    <span>{formatHeap(gateway.free_heap)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>{formatUptime(gateway.uptime)}</span>
                </div>

            </div>

          

        </div>
    );
}