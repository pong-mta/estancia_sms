import { Head, Link, useForm } from "@inertiajs/react";
import {
    LoaderCircle,
    Mail,
    Lock,
    User,
    UserPlus,
} from "lucide-react";
import { FormEventHandler } from "react";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } =
        useForm<RegisterForm>({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () =>
                reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="relative min-h-screen overflow-hidden bg-slate-950">

                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

                <div className="absolute -top-40 -left-40 h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[180px]" />

                <div className="absolute -bottom-40 -right-40 h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[180px]" />

                <div className="absolute left-12 top-24 h-3 w-3 animate-ping rounded-full bg-cyan-400" />
                <div className="absolute right-20 top-36 h-4 w-4 animate-pulse rounded-full bg-blue-500" />

                <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

                    <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">

                        {/* LEFT PANEL */}
                        <div className="hidden flex-col justify-center bg-gradient-to-br from-blue-900/10 to-cyan-900/5 p-14 lg:flex">

                            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-500/20 bg-white/5">

                                <UserPlus className="h-10 w-10 text-cyan-400" />

                            </div>

                            <h1 className="text-5xl font-black tracking-wide text-white">
                                PONG-MTA
                            </h1>

                            <p className="mt-3 uppercase tracking-[0.35em] text-cyan-400">
                                SMS Gateway
                            </p>

                            <p className="mt-8 max-w-md leading-8 text-slate-300">
                                Create your account to access the enterprise
                                messaging platform for OTP verification,
                                notifications, and bulk SMS services.
                            </p>

                            <div className="mt-10 space-y-4">

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-300">
                                    ✓ Fast Registration
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-300">
                                    ✓ Secure Authentication
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-300">
                                    ✓ Enterprise Ready
                                </div>

                            </div>

                        </div>

                        {/* RIGHT PANEL */}
                        <div className="p-6 sm:p-10 lg:p-14">

                            {/* Mobile Logo */}
                            <div className="mb-8 text-center lg:hidden">

                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-white/5">

                                    <UserPlus className="h-8 w-8 text-cyan-400" />

                                </div>

                                <h1 className="text-3xl font-black text-white">
                                    PONG-MTA
                                </h1>

                                <p className="mt-2 uppercase tracking-[0.25em] text-cyan-400">
                                    SMS Gateway
                                </p>

                            </div>

                            <div className="mb-10">

                                <h2 className="text-3xl font-bold text-white">
                                    Create Account
                                </h2>

                                <p className="mt-2 text-slate-400">
                                    Register to start using the SMS Gateway.
                                </p>

                            </div>

                            <form
                                onSubmit={submit}
                                className="space-y-6"
                            >

                                {/* Name */}
                                <div>

                                    <Label className="mb-2 block text-slate-300">
                                        Full Name
                                    </Label>

                                    <div className="relative">

                                        <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />

                                        <Input
                                            type="text"
                                            required
                                            autoFocus
                                            value={data.name}
                                            onChange={(e) =>
                                                setData(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            disabled={processing}
                                            placeholder="Full Name"
                                            className="h-12 rounded-xl border-slate-700 bg-slate-900/60 pl-12 text-white placeholder:text-slate-500 focus:border-cyan-400"
                                        />

                                    </div>

                                    <InputError message={errors.name} />

                                </div>

                                {/* Email */}
                                <div>

                                    <Label className="mb-2 block text-slate-300">
                                        Email Address
                                    </Label>

                                    <div className="relative">

                                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />

                                        <Input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) =>
                                                setData(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            disabled={processing}
                                            placeholder="email@example.com"
                                            className="h-12 rounded-xl border-slate-700 bg-slate-900/60 pl-12 text-white placeholder:text-slate-500 focus:border-cyan-400"
                                        />

                                    </div>

                                    <InputError message={errors.email} />

                                </div>

                                {/* Password */}
                                <div>

                                    <Label className="mb-2 block text-slate-300">
                                        Password
                                    </Label>

                                    <div className="relative">

                                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />

                                        <Input
                                            type="password"
                                            required
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            disabled={processing}
                                            placeholder="Password"
                                            className="h-12 rounded-xl border-slate-700 bg-slate-900/60 pl-12 text-white placeholder:text-slate-500 focus:border-cyan-400"
                                        />

                                    </div>

                                    <InputError message={errors.password} />

                                </div>

                                {/* Confirm Password */}
                                <div>

                                    <Label className="mb-2 block text-slate-300">
                                        Confirm Password
                                    </Label>

                                    <div className="relative">

                                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />

                                        <Input
                                            type="password"
                                            required
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            disabled={processing}
                                            placeholder="Confirm Password"
                                            className="h-12 rounded-xl border-slate-700 bg-slate-900/60 pl-12 text-white placeholder:text-slate-500 focus:border-cyan-400"
                                        />

                                    </div>

                                    <InputError
                                        message={
                                            errors.password_confirmation
                                        }
                                    />

                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-semibold transition hover:scale-[1.02]"
                                >
                                    {processing && (
                                        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                    )}

                                    Create Account
                                </Button>

                            </form>

                            <div className="mt-8 text-center text-sm text-slate-400">

                                Already have an account?{" "}

                                <Link
                                    href={route("login")}
                                    className="font-semibold text-cyan-400 hover:text-cyan-300"
                                >
                                    Log In
                                </Link>

                            </div>

                            <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
                                © 2026 PONG-MTA Information Technology Services
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}