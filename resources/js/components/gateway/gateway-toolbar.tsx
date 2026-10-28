import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
    search: string;
    setSearch: (value: string) => void;

    status: string;
    setStatus: (value: string) => void;

    refresh: () => void;
}

export default function GatewayToolbar({
    search,
    setSearch,
    status,
    setStatus,
    refresh,
}: Props) {
    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm">

            <div className="flex flex-col gap-3 lg:flex-row">

                <div className="relative flex-1">

                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>

                    <Input
                        className="pl-10"
                        placeholder="Search gateway..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />

                </div>

                <select
                    className="rounded-md border px-3"
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </select>

                <Button
                    variant="outline"
                    onClick={refresh}
                >
                    <RefreshCw className="mr-2 h-4 w-4"/>
                    Refresh
                </Button>

            </div>

        </div>
    );
}