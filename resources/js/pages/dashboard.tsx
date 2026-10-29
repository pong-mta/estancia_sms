import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    ArrowDownToLine,
    ArrowUpRight,
    CheckCircle2,
    MessageSquare,
    Radio,
    Send,
    Settings,
    Smartphone,
    Users,
    XCircle,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

const stats = [
    {
        label: 'SMS Sent Today',
        value: '0',
        detail: 'Messages submitted today',
        icon: Send,
        color: 'text-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
        label: 'Delivered Messages',
        value: '0',
        detail: 'Successfully delivered',
        icon: CheckCircle2,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
        label: 'Failed Messages',
        value: '0',
        detail: 'Unsuccessful deliveries',
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-50 dark:bg-red-950/30',
    },
    {
        label: 'SMS Recipients',
        value: '0',
        detail: 'Registered contacts',
        icon: Users,
        color: 'text-violet-600',
        bg: 'bg-violet-50 dark:bg-violet-950/30',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SMS Gateway Dashboard" />

            <div className="dark:bg-background min-h-full space-y-6 bg-slate-50/70 p-4 md:p-6">
                {/* Header */}
                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-950 via-green-800 to-emerald-700 p-6 text-white shadow-lg md:p-8">
                    <div className="absolute -top-16 -right-12 size-64 rounded-full border border-white/10" />
                    <div className="absolute -top-8 -right-4 size-48 rounded-full border border-white/10" />

                    <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-emerald-200 uppercase">
                                <Radio className="size-4" />
                                Municipal Communications
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">SMS Gateway</h1>

                            <p className="mt-2 text-sm text-green-100">Municipality of Estancia, Iloilo</p>

                            <p className="mt-4 max-w-lg text-sm leading-6 text-green-50/80">
                                Centralized SMS messaging for municipal announcements, emergency alerts, notifications, and public information.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 self-start rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm md:self-center">
                            <span className="relative flex size-3">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-50" />
                                <span className="relative inline-flex size-3 rounded-full bg-emerald-300" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold">Gateway Console</p>
                                <p className="mt-1 text-xs text-green-100">Check connection status</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-lg font-bold">Messaging Overview</h2>
                        <p className="text-muted-foreground mt-1 text-sm">Summary of SMS gateway activity.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div key={stat.label} className="bg-background rounded-xl border p-5 shadow-sm transition hover:shadow-md">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-muted-foreground text-sm">{stat.label}</p>
                                            <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                                        </div>

                                        <div className={`rounded-xl p-3 ${stat.bg}`}>
                                            <Icon className={`size-5 ${stat.color}`} />
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mt-4 text-xs">{stat.detail}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Quick actions */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-lg font-bold">Quick Actions</h2>
                        <p className="text-muted-foreground mt-1 text-sm">Access your most-used SMS tools.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link
                            href="/sms/compose"
                            className="group bg-background flex items-center gap-4 rounded-xl border p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
                        >
                            <div className="rounded-xl bg-emerald-600 p-3 text-white">
                                <Send className="size-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">Compose SMS</h3>
                                <p className="text-muted-foreground mt-1 text-sm">Send messages to recipients.</p>
                            </div>
                            <ArrowUpRight className="text-muted-foreground size-5 transition group-hover:text-emerald-600" />
                        </Link>

                        <Link
                            href="/sms/history"
                            className="group bg-background flex items-center gap-4 rounded-xl border p-5 shadow-sm transition hover:border-blue-400 hover:shadow-md"
                        >
                            <div className="rounded-xl bg-blue-600 p-3 text-white">
                                <MessageSquare className="size-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">Message History</h3>
                                <p className="text-muted-foreground mt-1 text-sm">Review sent messages and statuses.</p>
                            </div>
                            <ArrowUpRight className="text-muted-foreground size-5 transition group-hover:text-blue-600" />
                        </Link>

                        <Link
                            href="/contacts"
                            className="group bg-background flex items-center gap-4 rounded-xl border p-5 shadow-sm transition hover:border-violet-400 hover:shadow-md"
                        >
                            <div className="rounded-xl bg-violet-600 p-3 text-white">
                                <Smartphone className="size-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">Contacts</h3>
                                <p className="text-muted-foreground mt-1 text-sm">Manage mobile numbers and groups.</p>
                            </div>
                            <ArrowUpRight className="text-muted-foreground size-5 transition group-hover:text-violet-600" />
                        </Link>
                    </div>
                </section>

                {/* Gateway status */}
                <section className="bg-background rounded-xl border p-5 shadow-sm md:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                            <div className="dark:bg-muted rounded-xl bg-slate-100 p-3">
                                <Activity className="size-5" />
                            </div>
                            <div>
                                <h2 className="font-semibold">Gateway Monitoring</h2>
                                <p className="text-muted-foreground mt-1 text-sm">Monitor SMS service availability and delivery activity.</p>
                            </div>
                        </div>

                        <Link
                            href="/settings"
                            className="hover:bg-muted inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition"
                        >
                            <Settings className="size-4" />
                            Gateway Settings
                        </Link>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="dark:bg-muted/40 flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                            <ArrowUpRight className="size-5 text-emerald-600" />
                            <div>
                                <p className="text-sm font-medium">Outbound SMS</p>
                                <p className="text-muted-foreground text-xs">Messages sent from the gateway</p>
                            </div>
                        </div>

                        <div className="dark:bg-muted/40 flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                            <ArrowDownToLine className="size-5 text-blue-600" />
                            <div>
                                <p className="text-sm font-medium">Delivery Reports</p>
                                <p className="text-muted-foreground text-xs">Delivery status and message results</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="text-muted-foreground border-t pt-5 text-center text-xs">
                    Municipality of Estancia, Iloilo · Municipal SMS Gateway
                </footer>
            </div>
        </AppLayout>
    );
}
