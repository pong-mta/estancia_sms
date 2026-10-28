import {
    Cpu,
    Signal,
    MemoryStick,
    Clock3,
    Globe,
    Smartphone,
} from "lucide-react";

interface Props {
    gateway: any;
}

function formatHeap(bytes: number) {
    if (!bytes) return "-";
    return `${(bytes / 1024).toFixed(0)} KB`;
}

function formatUptime(seconds: number) {
    if (!seconds) return "-";

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;

    return `${minutes}m`;
}

function Card({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}) {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center gap-2 text-gray-500">
                {icon}
                <span className="text-sm">{title}</span>
            </div>

            <h2 className="text-2xl font-bold">
                {value}
            </h2>

        </div>
    );
}

export default function DeviceOverview({ gateway }: Props) {

    return (

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            <Card
                icon={<Cpu className="h-5 w-5" />}
                title="Firmware"
                value={`v${gateway.firmware_version}`}
            />

            <Card
                icon={<Signal className="h-5 w-5" />}
                title="Signal"
                value={`${gateway.signal} dBm`}
            />

            <Card
                icon={<MemoryStick className="h-5 w-5" />}
                title="Heap"
                value={formatHeap(gateway.free_heap)}
            />

            <Card
                icon={<Clock3 className="h-5 w-5" />}
                title="Uptime"
                value={formatUptime(gateway.uptime)}
            />

            <Card
                icon={<Globe className="h-5 w-5" />}
                title="IP Address"
                value={gateway.ip}
            />

            <Card
                icon={<Smartphone className="h-5 w-5" />}
                title="SIM"
                value={gateway.sim_operator}
            />

        </div>

    );

}