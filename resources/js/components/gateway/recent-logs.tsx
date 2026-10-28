import { Badge } from "@/components/ui/badge";

interface Props {
    logs: any[];
}

export default function RecentLogs({ logs }: Props) {
    return (
        <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b p-4">
                <h2 className="text-lg font-semibold">
                    Recent Gateway Activity
                </h2>
            </div>

            <div className="max-h-[550px] divide-y overflow-y-auto">
                {logs.length === 0 && (
                    <div className="p-4 text-sm text-gray-500">
                        No activity yet.
                    </div>
                )}

                {logs.map((log) => (
                    <div
                        key={log.id}
                        className="flex items-center justify-between p-4"
                    >
                        <div>
                            <div className="font-medium">
                                {log.device}
                            </div>

                            <div className="text-sm text-gray-500">
                                {log.event}
                            </div>

                            {log.message && (
                                <div className="text-xs text-gray-400">
                                    {log.message}
                                </div>
                            )}
                        </div>

                        <div className="text-right">
                            <Badge
                                variant={
                                    log.level === "success"
                                        ? "default"
                                        : log.level === "error"
                                        ? "destructive"
                                        : "secondary"
                                }
                            >
                                {log.level}
                            </Badge>

                            <div className="mt-1 text-xs text-gray-500">
                                {new Date(log.created_at).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t p-4 text-center">

                <button
                    className="text-sm font-semibold text-blue-600 hover:underline"
                >
                    View All Logs
                </button>

            </div>
        </div>
    );
}