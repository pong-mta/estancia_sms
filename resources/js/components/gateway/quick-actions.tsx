import axios from "axios";
import { toast } from "sonner";
import {
    RotateCcw,
    Radio,
    RefreshCcw,
    Clock3,
    Trash2,
    Upload,
} from "lucide-react";

interface Props {
    gateway: any;
}

function ActionButton({
    icon,
    title,
    color,
    onClick,
}: {
    icon: React.ReactNode;
    title: string;
    color: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-2 rounded-xl px-5 py-4 font-semibold text-white transition hover:opacity-90 ${color}`}
        >
            {icon}
            {title}
        </button>
    );
}

export default function QuickActions({ gateway }: Props) {
    const sendCommand = async (command: string) => {
        try {
            await axios.post("/api/gateway/command", {
                device: gateway.device,
                command,
            });

            toast.success(`${command} queued successfully.`);
        } catch {
            toast.error("Unable to send command.");
        }
    };

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-bold">
                Quick Actions
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

                <ActionButton
                    title="Restart ESP32"
                    color="bg-red-600"
                    icon={<RotateCcw size={18} />}
                    onClick={() => sendCommand("restart")}
                />

                <ActionButton
                    title="Restart GSM"
                    color="bg-orange-600"
                    icon={<Radio size={18} />}
                    onClick={() => sendCommand("restart_gsm")}
                />

                <ActionButton
                    title="Refresh Signal"
                    color="bg-blue-600"
                    icon={<RefreshCcw size={18} />}
                    onClick={() => sendCommand("refresh_signal")}
                />

                <ActionButton
                    title="Sync Time"
                    color="bg-green-600"
                    icon={<Clock3 size={18} />}
                    onClick={() => sendCommand("sync_time")}
                />

                <ActionButton
                    title="Clear Queue"
                    color="bg-gray-700"
                    icon={<Trash2 size={18} />}
                    onClick={() => sendCommand("clear_queue")}
                />

                <ActionButton
                    title="OTA Update"
                    color="bg-purple-600"
                    icon={<Upload size={18} />}
                    onClick={() => sendCommand("ota")}
                />

            </div>

        </div>
    );
}