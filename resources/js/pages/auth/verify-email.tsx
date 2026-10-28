import { Head, Link, useForm } from "@inertiajs/react";
import {
    LoaderCircle,
    MailCheck,
    Mail,
} from "lucide-react";
import { FormEventHandler } from "react";

import { Button } from "@/components/ui/button";

export default function VerifyEmail({
    status,
}: {
    status?: string;
}) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <>
            <Head title="Verify Email" />

            <div className="relative min-h-screen overflow-hidden bg-slate-950">

                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

                <div className="absolute -top-40 -left-40 h-[320px] w-[320px] rounded-full bg-blue-600/20 blur-[130px] sm:h-[520px] sm:w-[520px] sm:blur-[180px]" />

                <div className="absolute -bottom-40 -right-40 h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-[130px] sm:h-[520px] sm:w-[520px] sm:blur-[180px]" />

                <div className="absolute left-12 top-24 h-3 w-3 animate-ping rounded-full bg-cyan-400" />
                <div className="absolute right-20 top-40 h-4 w-4 animate-pulse rounded-full bg-blue-500" />

                <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

                    <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

                        {/* Icon */}
                        <div className="mb-8 flex justify-center">

                            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-500/20 bg-white/5">

                                <MailCheck className="h-12 w-12 text-cyan-400" />

                            </div>

                        </div>

                        {/* Heading */}
                        <h1 className="text-center text-3xl font-black text-white">
                            Verify Your Email
                        </h1>

                        <p className="mx-auto mt-4 max-w-md text-center leading-7 text-slate-300">
                            We've sent a verification link to your email
                            address.
                            <br />
                            Please check your inbox and click the verification
                            link before accessing your dashboard.
                        </p>

                        {/* Success */}
                        {status === "verification-link-sent" && (

                            <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-center text-sm text-green-400">

                                ✅ A new verification email has been sent.

                            </div>

                        )}

                        {/* Buttons */}
                        <form
                            onSubmit={submit}
                            className="mt-8 space-y-4"
                        >

                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-semibold transition hover:scale-[1.02]"
                            >
                                {processing && (
                                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                )}

                                <Mail className="mr-2 h-5 w-5" />

                                Resend Verification Email
                            </Button>

                        </form>

                        {/* Logout */}
                        <div className="mt-6 text-center">

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-sm font-medium text-slate-400 transition hover:text-cyan-400"
                            >
                                Log Out
                            </Link>

                        </div>

                        {/* Footer */}
                        <div className="mt-10 border-t border-white/10 pt-6 text-center">

                            <div className="text-sm font-medium text-slate-400">
                                PONG-MTA Information Technology Services
                            </div>

                            <div className="mt-1 text-xs text-slate-500">
                                Enterprise SMS Gateway
                            </div>

                            <div className="mt-2 text-xs text-slate-600">
                                © 2026 PONG-MTA. All Rights Reserved.
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}