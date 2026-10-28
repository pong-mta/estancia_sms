import { Server, Wifi, WifiOff, Send, Cpu, MailX } from "lucide-react";

interface Props {
    stats: {
        online: number;
        offline: number;
        pending: number;
        failed: number;
        sentToday: number;
        firmware: string | null;
    };
}

export default function OverviewCards({ stats }: Props) {
    const cards = [
        {
            title: "Online",
            value: stats.online,
            icon: Wifi,
            color: "text-green-600",
        },
        {
            title: "Offline",
            value: stats.offline,
            icon: WifiOff,
            color: "text-red-600",
        },
        {
            title: "Pending SMS",
            value: stats.pending,
            icon: Send,
            color: "text-orange-500",
        },
        {
            title: "Sent Today",
            value: stats.sentToday,
            icon: Server,
            color: "text-blue-600",
        },
        {
            title: "Failed SMS",
            value: stats.failed,
            icon: MailX,
            color: "text-red-600",
        },
        {
            title: "Firmware",
            value: stats.firmware ?? "-",
            icon: Cpu,
            color: "text-violet-600",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="rounded-xl border bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {card.title}
                                </p>

                                <h2 className="mt-2 text-lg font-bold">
                                    {card.value}
                                </h2>
                            </div>

                            <Icon
                                className={`h-10 w-10 ${card.color}`}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}