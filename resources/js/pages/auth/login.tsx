import { Head, useForm } from '@inertiajs/react';
import { Landmark, LoaderCircle, Lock, Mail, MessageSquare, Radio, Send, ShieldCheck } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login | Municipality of Estancia" />

            <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-6 sm:px-6">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />
                <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-[130px]" />

                <div className="absolute top-20 left-10 h-2 w-2 animate-ping rounded-full bg-cyan-400" />
                <div className="absolute top-32 right-10 h-3 w-3 animate-pulse rounded-full bg-blue-500" />

                {/* Login container */}
                <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl lg:grid-cols-2">
                    {/* Left panel */}
                    <section className="hidden flex-col justify-center bg-gradient-to-br from-blue-900/20 to-cyan-900/10 p-10 lg:flex xl:p-12">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-white/5">
                            <Landmark className="h-9 w-9 text-cyan-400" />
                        </div>

                        <p className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase">Republic of the Philippines</p>

                        <h1 className="mt-3 text-3xl font-black tracking-wide text-white xl:text-4xl">MUNICIPALITY OF ESTANCIA</h1>

                        <p className="mt-2 text-sm font-medium tracking-[0.25em] text-slate-400 uppercase">Province of Iloilo</p>

                        <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />

                        <div className="mt-7 flex items-center gap-3">
                            <div className="rounded-xl border border-cyan-500/20 bg-white/5 p-2.5">
                                <MessageSquare className="h-6 w-6 text-cyan-400" />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-white">Municipal SMS Gateway</h2>
                                <p className="mt-1 text-xs text-slate-400">Government Messaging Platform</p>
                            </div>
                        </div>

                        <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
                            A centralized communication platform supporting municipal announcements, public service notifications, emergency alerts,
                            and secure system messages for the people of Estancia.
                        </p>

                        <div className="mt-7 space-y-3">
                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300">
                                <Send className="h-5 w-5 shrink-0 text-cyan-400" />
                                Municipal Announcements
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300">
                                <Radio className="h-5 w-5 shrink-0 text-red-400" />
                                Emergency and Disaster Alerts
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300">
                                <ShieldCheck className="h-5 w-5 shrink-0 text-green-400" />
                                Secure Government Messaging
                            </div>
                        </div>
                    </section>

                    {/* Right panel */}
                    <section className="p-6 sm:p-9 lg:p-10 xl:p-12">
                        {/* Mobile header */}
                        <div className="mb-7 text-center lg:hidden">
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-white/5">
                                <Landmark className="h-8 w-8 text-cyan-400" />
                            </div>

                            <p className="text-[10px] font-semibold tracking-[0.2em] text-cyan-400 uppercase">Republic of the Philippines</p>

                            <h1 className="mt-2 text-xl font-black tracking-wide text-white sm:text-2xl">MUNICIPALITY OF ESTANCIA</h1>

                            <p className="mt-1 text-xs tracking-[0.2em] text-slate-400 uppercase">Province of Iloilo</p>

                            <p className="mt-3 text-sm font-semibold text-cyan-400">Municipal SMS Gateway</p>
                        </div>

                        {/* Form heading */}
                        <div className="mb-7">
                            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

                            <p className="mt-2 text-sm leading-6 text-slate-400">Sign in to access the municipal messaging system.</p>
                        </div>

                        {status && (
                            <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-400">
                                {status}
                            </div>
                        )}

                        {/* Login form */}
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <Label className="mb-2 block text-slate-300">Email Address</Label>

                                <div className="relative">
                                    <Mail className="absolute top-3.5 left-4 h-5 w-5 text-slate-500" />

                                    <Input
                                        type="email"
                                        required
                                        autoFocus
                                        autoComplete="username"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                        className="h-12 rounded-xl border-slate-700 bg-slate-900/60 pl-12 text-white placeholder:text-slate-500 focus:border-cyan-400"
                                    />
                                </div>

                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <Label className="text-slate-300">Password</Label>
                                </div>

                                <div className="relative">
                                    <Lock className="absolute top-3.5 left-4 h-5 w-5 text-slate-500" />

                                    <Input
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Enter your password"
                                        className="h-12 rounded-xl border-slate-700 bg-slate-900/60 pl-12 text-white placeholder:text-slate-500 focus:border-cyan-400"
                                    />
                                </div>

                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox checked={data.remember} onCheckedChange={(checked) => setData('remember', !!checked)} />

                                <span className="text-sm text-slate-300">Remember me</span>
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-semibold text-white transition hover:brightness-110"
                            >
                                {processing && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}

                                {processing ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>

                        {/* Footer */}
                        <footer className="mt-7 border-t border-white/10 pt-4 text-center">
                            <p className="text-xs font-medium text-slate-400">Municipality of Estancia, Iloilo</p>

                            <p className="mt-1 text-[10px] text-slate-500">Municipal SMS Gateway</p>

                            <p className="mt-2 text-[10px] text-slate-600">
                                © {new Date().getFullYear()} Municipality of Estancia. All Rights Reserved.
                            </p>
                        </footer>
                    </section>
                </div>
            </main>
        </>
    );
}
