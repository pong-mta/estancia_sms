import { useEffect, useMemo, useState } from "react";

import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";

import OverviewCards from "@/components/gateway/overview-cards";
import GatewayGrid from "@/components/gateway/gateway-grid";
import GatewayToolbar from "@/components/gateway/gateway-toolbar";
import RecentLogs from "@/components/gateway/recent-logs";

export default function Index({
    stats,
    gateways,
    firmwares,
    logs,
}: any) {

    const [search,setSearch]=useState("");

    const [status,setStatus]=useState("all");

    const filtered = useMemo(()=>{

        return gateways.filter((g:any)=>{

            const matchesSearch =
                g.device.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                status==="all" || g.status===status;

            return matchesSearch && matchesStatus;

        });

    },[gateways,search,status]);

    function refresh()
{
        router.reload({
            only:["stats","gateways","logs"],
            preserveScroll: true,
        });
    }

    useEffect(() => {

        const interval = setInterval(() => {

            router.reload({
                only: ["stats", "gateways", "logs"],
                preserveScroll: true,
            });

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <AppLayout>

            <Head title="Gateway Manager"/>

            <div className="space-y-6 p-6">

                <OverviewCards stats={stats}/>

                <GatewayToolbar
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    refresh={refresh}
                />

                <GatewayGrid gateways={filtered} />

                <RecentLogs logs={logs} />

            </div>

        </AppLayout>

    );

}