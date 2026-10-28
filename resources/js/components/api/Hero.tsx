import { BookOpen, KeyRound } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Hero() {
    return (
        <section className="border-b bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
            <div className="mx-auto max-w-7xl px-8 py-12">

                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                    <div>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
                            Developer Documentation
                        </span>

                        <h1 className="mt-5 text-5xl font-bold">
                            PONG-MTA SMS API
                        </h1>

                        <p className="mt-4 max-w-3xl text-lg text-blue-100">
                            Integrate SMS messaging into your
                            website, ERP, POS, CRM, mobile application,
                            or any custom software using our REST API.
                        </p>
                    </div>

                    <div className="flex gap-4">

                        <Link
                            href="/settings/api"
                            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow hover:bg-blue-50"
                        >
                            <KeyRound size={18} />
                            API Keys
                        </Link>

                        <a
                            href="#send-sms"
                            className="flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 hover:bg-white/10"
                        >
                            <BookOpen size={18} />
                            Quick Start
                        </a>

                    </div>

                </div>

            </div>
        </section>
    );
}