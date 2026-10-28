import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDateTime, formatMobile } from '@/lib/format';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';


interface Props {
    logs: any;
    filters: {
        search: string;
    };
}

export default function SmsLogs({ logs, filters }: Props) {

    const [search, setSearch] = useState(filters.search ?? '');
    const [selected, setSelected] = useState<number[]>([]); 
    const { flash } = usePage().props as any;
    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => {

        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }

    }, [flash]);

    useEffect(() => {

        const timeout = setTimeout(() => {

            router.get(
                route('sms.index'),
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['logs', 'filters'],
                }
            );

        }, 500);

        return () => clearTimeout(timeout);

    }, [search]);
    useEffect(() => {

        const interval = setInterval(() => {

            router.reload({
                only: ['logs'],
                preserveScroll: true,
                preserveState: true,
            });

        }, 3000);

        return () => clearInterval(interval);

    }, []);

    const toggleAll = () => {

        if (selected.length === logs.data.length) {
            setSelected([]);
        } else {
            setSelected(logs.data.map((log: any) => log.id));
        }

    };
    const toggle = (id: number) => {

        if (selected.includes(id)) {
            setSelected(selected.filter(x => x !== id));
        } else {
            setSelected([...selected, id]);
        }

    };

    function badge(status: string) {

        switch (status) {

            case 'sent':
                return 'bg-green-100 text-green-700';

            case 'failed':
                return 'bg-red-100 text-red-700';

            case 'sending':
                return 'bg-yellow-100 text-yellow-700';

            default:
                return 'bg-gray-100 text-gray-700';
        }
    }

    function deleteSelected() {

        if (!selected.length) return;

        if (!confirm(`Delete ${selected.length} selected logs?`)) {
            return;
        }

        router.delete(route('sms.destroy'), {
            data: {
                ids: selected,
            },
            preserveScroll: true,
            onSuccess: () => {
                setSelected([]);
            },
        });

    }

    return (
        <AppLayout>

            <Head title="SMS Logs" />

            <div className="space-y-6 p-6">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h1 className="text-2xl font-bold">
                            SMS Logs
                        </h1>

                        <p className="text-gray-500">
                            SMS delivery history
                        </p>

                    </div>

                    <div className="relative w-full md:w-80">

                        <Search
                            className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                        />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search recipient, mobile, message..."
                            className="w-full rounded-lg border py-2 pl-10 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />

                        {search && (

                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500"
                            >
                                <X size={16} />
                            </button>

                        )}

                    </div>

                </div>

                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        {selected.length > 0 && (

                            <div className="mb-4 flex items-center justify-between rounded-lg border bg-blue-50 p-3">

                                <span className="text-sm">

                                    {selected.length} selected

                                </span>

                                <button
                                    onClick={deleteSelected}
                                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                >
                                    Delete Selected
                                </button>

                            </div>

                        )}

                        <table className="min-w-full text-sm">

                            <thead className="bg-gray-50">

                            <tr>
                                <th className="w-12 px-4 py-3">

                                    <input
                                        type="checkbox"
                                        checked={
                                            logs.data.length > 0 &&
                                            selected.length === logs.data.length
                                        }
                                        onChange={toggleAll}
                                    />

                                </th>

                                <th className="px-5 py-3 text-left font-semibold">
                                    Recipient
                                </th>

                                <th className="px-5 py-3 text-left font-semibold">
                                    Mobile
                                </th>

                                <th className="px-5 py-3 text-left font-semibold">
                                    Message
                                </th>

                                <th className="px-5 py-3 text-center font-semibold">
                                    Status
                                </th>

                                <th className="px-5 py-3 text-left font-semibold">
                                    Response
                                </th>

                                <th className="px-5 py-3 text-left font-semibold">
                                    Sent At
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {logs.data.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={6}
                                        className="py-12 text-center text-gray-500"
                                    >
                                        No SMS logs found.
                                    </td>

                                </tr>

                            )}

                            {logs.data.map((log: any) => (

                                <tr
                                    key={log.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-4 py-4">

                                        <input
                                            type="checkbox"
                                            checked={selected.includes(log.id)}
                                            onChange={() => toggle(log.id)}
                                        />

                                    </td>

                                    <td className="px-5 py-4 font-medium">
                                        {log.contact
                                            ? `${log.contact.first_name ?? ""} ${log.contact.last_name ?? ""}`.trim()
                                            : formatMobile(log.mobile)}
                                    </td>

                                    <td className="px-5 py-4 font-mono">

                                        {formatMobile(log.mobile)}

                                    </td>

                                    <td className="max-w-md px-5 py-4">
                                        {expandedId === log.id ? (
                                            <>
                                                <div className="whitespace-pre-wrap break-words">
                                                    {log.sms_message.message}
                                                </div>

                                                <button
                                                    onClick={() => setExpandedId(null)}
                                                    className="mt-2 text-xs text-blue-600 hover:underline"
                                                >
                                                    Show Less
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="truncate">
                                                    {log.sms_message.message}
                                                </div>

                                                {log.sms_message.message.length > 60 && (
                                                    <button
                                                        onClick={() => setExpandedId(log.id)}
                                                        className="mt-1 text-xs text-blue-600 hover:underline"
                                                    >
                                                        Read More
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-center">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(log.status)}`}
                                        >
                                            {log.status}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        {log.response ?? '-'}

                                    </td>

                                    <td className="whitespace-nowrap px-5 py-4">

                                        {formatDateTime(log.sent_at)}

                                    </td>

                                </tr>

                            ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                    <div className="text-sm text-gray-500">

                        Showing page {logs.current_page} of {logs.last_page}

                    </div>

                    <div className="flex flex-wrap gap-2">

                        {logs.links.map((link: any, index: number) => (

                            <Link
                                key={index}
                                href={link.url ?? '#'}
                                preserveScroll
                                preserveState
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                className={`rounded-md border px-3 py-2 text-sm transition ${
                                    link.active
                                        ? 'border-blue-600 bg-blue-600 text-white'
                                        : 'hover:bg-gray-100'
                                } ${
                                    !link.url
                                        ? 'pointer-events-none opacity-40'
                                        : ''
                                }`}
                            />

                        ))}

                    </div>

                </div>

            </div>

        </AppLayout>
    );
}