import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Search, Users, Send } from "lucide-react";
import { toast } from "sonner";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

interface Contact {
    id: number;
    first_name: string;
    last_name: string | null;
    mobile: string;
}

interface Props {
    contacts: Contact[];
}

export default function Compose({ contacts }: Props) {
    const [search, setSearch] = useState("");
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        contacts: [] as number[],
        message: "",
    });

    const { sms_tokens, flash } = usePage().props as {
        sms_tokens: number;
        flash: {
            success?: string;
            error?: string;
        };
    };
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);


    const filteredContacts = useMemo(() => {
        return contacts.filter((contact) => {
            const keyword = search.toLowerCase();

            return (
                contact.first_name.toLowerCase().includes(keyword) ||
                (contact.last_name ?? "").toLowerCase().includes(keyword) ||
                contact.mobile.includes(keyword)
            );
        });
    }, [contacts, search]);

    function toggleContact(id: number) {
        if (data.contacts.includes(id)) {
            setData(
                "contacts",
                data.contacts.filter((x) => x !== id)
            );
        } else {
            setData("contacts", [...data.contacts, id]);
        }
    }

    function selectAll() {
        setData(
            "contacts",
            filteredContacts.map((contact) => contact.id)
        );
    }

    function deselectAll() {
        setData("contacts", []);
    }

    const allSelected =
        filteredContacts.length > 0 &&
        filteredContacts.every((contact) =>
            data.contacts.includes(contact.id)
        );

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route("messages.store"), {
            preserveScroll: true,

            onSuccess: () => {
                reset();
                setSearch("");
            },
        });
    }

    return (
        <AppLayout>
            <Head title="Compose SMS" />

            <div className="p-6">

                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Compose SMS
                        </h1>

                        <p className="text-gray-500">
                            Send SMS to your contacts
                        </p>
                    </div>

                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3">

                        <p className="text-xs uppercase tracking-wide text-amber-700">
                            SMS Credits
                        </p>

                        <h2 className="text-3xl font-bold text-amber-600">
                            {sms_tokens.toLocaleString()}
                        </h2>

                    </div>

                </div>

                <div className="grid gap-6 lg:grid-cols-3">

                    {/* CONTACTS */}

                    <div className="rounded-xl border bg-white p-5 dark:bg-gray-900">

                        <div className="mb-4 flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            <h2 className="font-semibold">
                                Recipients
                            </h2>
                        </div>

                        <div className="relative mb-4">

                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                            <input
                                type="text"
                                placeholder="Search contact..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border py-2 pl-10 pr-4"
                            />

                        </div>

                        <div className="mb-3 flex items-center justify-between">

                            <label className="flex items-center gap-2">

                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            selectAll();
                                        } else {
                                            deselectAll();
                                        }
                                    }}
                                    className="h-4 w-4 rounded"
                                />

                                <span className="text-sm font-medium">
                                    Select All
                                </span>

                            </label>

                            <span className="text-sm text-gray-500">
                                Selected: {data.contacts.length}
                            </span>

                        </div>

                        <div className="max-h-[550px] space-y-2 overflow-y-auto">

                            {filteredContacts.map((contact) => (

                                <label
                                    key={contact.id}
                                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >

                                    <input
                                        type="checkbox"
                                        checked={data.contacts.includes(contact.id)}
                                        onChange={() => toggleContact(contact.id)}
                                    />

                                    <div>

                                        <div className="font-medium">
                                            {contact.first_name}{" "}
                                            {contact.last_name}
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {contact.mobile}
                                        </div>

                                    </div>

                                </label>

                            ))}

                        </div>

                    </div>

                    {/* MESSAGE */}

                    <form
                        onSubmit={submit}
                        className="lg:col-span-2 rounded-xl border bg-white p-5 dark:bg-gray-900"
                    >

                        <h2 className="mb-4 text-xl font-semibold">
                            Message
                        </h2>

                        <textarea
                            rows={12}
                            value={data.message}
                            maxLength={160}
                            onChange={(e) => setData("message", e.target.value)}
                            placeholder="Type your SMS message here..."
                            className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.message && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.message}
                            </p>
                        )}

                        <div className="mt-3 flex justify-end">

                            <span
                                className={`text-sm font-medium ${
                                    data.message.length >= 150
                                        ? "text-red-500"
                                        : "text-gray-500"
                                }`}
                            >
                                {data.message.length}/160
                            </span>

                        </div>
                        {/* SMS Summary */}
                        <div className="mt-4 rounded-lg border bg-blue-50 p-4">

                            <div className="flex justify-between">
                                <span>Recipients</span>
                                <strong>{data.contacts.length}</strong>
                            </div>

                            <div className="mt-2 flex justify-between">
                                <span>Credits Required</span>
                                <strong>{data.contacts.length}</strong>
                            </div>

                            <div className="mt-2 flex justify-between">
                                <span>Remaining After Send</span>
                                <strong
                                    className={
                                        sms_tokens - data.contacts.length < 0
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }
                                >
                                    {(sms_tokens - data.contacts.length).toLocaleString()}
                                </strong>
                            </div>

                        </div>

                        <div className="mt-8 flex justify-end gap-3">

                            <button
                                className="rounded-lg border px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={() => {
                                    reset();
                                    setSearch("");
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={
                                    processing ||
                                    data.contacts.length === 0 ||
                                    data.message.trim() === ""
                                }
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Send className="h-4 w-4" />
                                Send Message
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </AppLayout>
    );
}