import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import DeviceOverview from "@/components/gateway/device-overview";
import QuickActions from "@/components/gateway/quick-actions";

import {
    ArrowLeft,
    Wifi,
    WifiOff,
} from "lucide-react";

export default function Show({
    gateway,
    commands,
    logs,
    smsHistory,
}: any) {

    return (

        <AppLayout>

            <Head title={gateway.device} />

            <div className="space-y-6 p-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <button
                            onClick={() => router.visit("/gateway-manager")}
                            className="mb-3 flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
                        >
                            <ArrowLeft className="h-4 w-4" />

                            Back to Gateway Manager
                        </button>

                        <h1 className="text-3xl font-bold">
                            {gateway.device}
                        </h1>

                        <p className="mt-1 text-gray-500">
                            {gateway.ip}
                        </p>

                    </div>

                    <div
                        className={`flex items-center gap-2 rounded-full px-5 py-3 font-semibold ${
                            gateway.status === "online"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {gateway.status === "online" ? (
                            <Wifi className="h-5 w-5" />
                        ) : (
                            <WifiOff className="h-5 w-5" />
                        )}

                        {gateway.status.toUpperCase()}
                    </div>

                </div>

                {/* Overview Cards */}
                <DeviceOverview gateway={gateway} />
                
                <QuickActions gateway={gateway} />

            </div>

        </AppLayout>

    );

}