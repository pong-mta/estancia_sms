import { Head, Link } from '@inertiajs/react';
import { BellRing, Building2, ChevronRight, Landmark, MessageSquare, Radio, Send, ShieldCheck, Smartphone } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="Municipality of Estancia | SMS Gateway" />

            <div className="relative min-h-screen overflow-hidden bg-slate-950">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

                <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[150px]" />
                <div className="absolute -right-40 -bottom-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[150px]" />

                {/* Decorative lights */}
                <div className="absolute top-20 left-10 h-3 w-3 animate-pulse rounded-full bg-cyan-400 sm:left-20" />
                <div className="absolute top-36 right-10 h-3 w-3 animate-ping rounded-full bg-blue-500 sm:right-24" />

                {/* Main content */}
                <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
                    <div className="w-full max-w-7xl">
                        {/* Government identity */}
                        <div className="mb-12 flex flex-col items-center text-center">
                            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/30 bg-white/5 shadow-2xl shadow-blue-700/20 backdrop-blur-xl sm:h-28 sm:w-28">
                                <Landmark className="h-12 w-12 text-cyan-400 sm:h-14 sm:w-14" />
                            </div>

                            <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase sm:text-sm sm:tracking-[0.35em]">
                                Republic of the Philippines
                            </p>

                            <h1 className="mt-3 text-3xl font-black tracking-wide text-white sm:text-5xl lg:text-6xl">MUNICIPALITY OF ESTANCIA</h1>

                            <p className="mt-3 text-sm font-semibold tracking-[0.2em] text-slate-300 uppercase sm:text-base sm:tracking-[0.35em]">
                                Province of Iloilos
                            </p>

                            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />

                            <div className="mt-7 flex items-center gap-3">
                                <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-3 backdrop-blur-xl">
                                    <MessageSquare className="h-8 w-8 text-cyan-400" />
                                </div>

                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-white sm:text-2xl">Municipal SMS Gateway</h2>
                                    <p className="mt-1 text-sm text-slate-400">Government Messaging and Notification System</p>
                                </div>
                            </div>

                            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                                A centralized messaging platform designed to support municipal offices in delivering official announcements, public
                                service notifications, emergency alerts, and secure system messages to the people of Estancia.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Public announcements */}
                            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/60 hover:bg-white/10">
                                <div className="mb-4 inline-flex rounded-2xl bg-cyan-500/10 p-3">
                                    <Send className="h-8 w-8 text-cyan-400" />
                                </div>

                                <h3 className="text-lg font-bold text-white">Municipal Announcements</h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    Distribute official announcements, public advisories, municipal updates, and service notifications through SMS.
                                </p>
                            </div>

                            {/* Emergency alerts */}
                            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-400/60 hover:bg-white/10">
                                <div className="mb-4 inline-flex rounded-2xl bg-red-500/10 p-3">
                                    <Radio className="h-8 w-8 text-red-400" />
                                </div>

                                <h3 className="text-lg font-bold text-white">Emergency Alerts</h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    Help disseminate disaster warnings, weather advisories, evacuation notices, and urgent public safety information.
                                </p>
                            </div>

                            {/* Secure OTP */}
                            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-400/60 hover:bg-white/10">
                                <div className="mb-4 inline-flex rounded-2xl bg-green-500/10 p-3">
                                    <ShieldCheck className="h-8 w-8 text-green-400" />
                                </div>

                                <h3 className="text-lg font-bold text-white">Secure Authentication</h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    Support OTP verification and security notifications for authorized municipal personnel and integrated
                                    applications.
                                </p>
                            </div>

                            {/* LGU integration */}
                            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/60 hover:bg-white/10">
                                <div className="mb-4 inline-flex rounded-2xl bg-blue-500/10 p-3">
                                    <Building2 className="h-8 w-8 text-blue-400" />
                                </div>

                                <h3 className="text-lg font-bold text-white">LGU Office Integration</h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    Provide a centralized messaging service for municipal offices, departments, and approved government applications.
                                </p>
                            </div>

                            {/* Notifications */}
                            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/60 hover:bg-white/10">
                                <div className="mb-4 inline-flex rounded-2xl bg-amber-500/10 p-3">
                                    <BellRing className="h-8 w-8 text-amber-400" />
                                </div>

                                <h3 className="text-lg font-bold text-white">Public Service Notifications</h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    Support reminders, application updates, appointment notifications, and other citizen-facing municipal services.
                                </p>
                            </div>

                            {/* API */}
                            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/60 hover:bg-white/10">
                                <div className="mb-4 inline-flex rounded-2xl bg-purple-500/10 p-3">
                                    <Smartphone className="h-8 w-8 text-purple-400" />
                                </div>

                                <h3 className="text-lg font-bold text-white">System Integration API</h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    Integrate approved municipal systems, websites, mobile applications, and authorized third-party services.
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/login"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3.5 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 sm:w-auto"
                            >
                                Access System
                                <ChevronRight size={18} />
                            </Link>
                        </div>

                        {/* Footer */}
                        <footer className="mt-16 border-t border-white/10 pt-8 text-center">
                            <div className="flex items-center justify-center gap-2 text-slate-300">
                                <Landmark className="h-5 w-5 text-cyan-400" />
                                <h3 className="text-sm font-semibold tracking-wide">Municipality of Estancia, Iloilo</h3>
                            </div>

                            <p className="mt-3 text-xs text-slate-500">Municipal SMS Gateway • Government Messaging Platform</p>

                            <p className="mt-2 text-xs text-slate-600">
                                © {new Date().getFullYear()} Municipality of Estancia, Iloilo. All Rights Reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
