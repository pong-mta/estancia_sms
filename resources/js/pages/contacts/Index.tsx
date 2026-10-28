import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Plus,
    Upload,
    Search,
    Users,
    Building2,
    UserCheck,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import AddContactModal from '@/components/contacts/AddContactModal';
import EditContactModal from "@/components/contacts/EditContactModal";
import DeleteContactDialog from "@/components/contacts/DeleteContactDialog";

import { toast } from "sonner";
import { Head, Link, router, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: '/contacts',
    },
];

interface Contact {
    id: number;
    first_name: string;
    last_name: string | null;
    mobile: string;
    email: string | null;
    company: string |null;
    status: string;
}

interface Props {
    contacts: {
        data: Contact[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        search?: string;
    };
}


export default function Contacts({ contacts, filters, }: Props) {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [search, setSearch] = useState(filters.search ?? "");

    
    const { flash } = usePage().props as {
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("contacts.index"),
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />

            <div className="space-y-6 p-4 sm:p-6">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>
                        <h1 className="text-2xl font-bold sm:text-3xl">
                            Contacts
                        </h1>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage all SMS recipients.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <button
                            className="flex items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-medium hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <Upload size={18} />
                            Import CSV
                        </button>

                        <button
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                            onClick={() => setOpen(true)}
                        >
                            <Plus size={18} />
                            Add Contact
                        </button>

                    </div>

                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                    {/* Total */}

                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total Contacts
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {contacts.data.length}
                                </h2>

                            </div>

                            <Users
                                className="text-blue-600"
                                size={42}
                            />

                        </div>

                    </div>

                    {/* Companies */}

                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Companies
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {
                                        new Set(
                                            contacts.data
                                                .filter(c => c.company)
                                                .map(c => c.company)
                                        ).size
                                    }
                                </h2>

                            </div>

                            <Building2
                                className="text-green-600"
                                size={42}
                            />

                        </div>

                    </div>

                    {/* Active */}

                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:col-span-2 xl:col-span-1">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Active
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {
                                        contacts.data.filter(
                                            c => c.status === 'active'
                                        ).length
                                    }
                                </h2>

                            </div>

                            <UserCheck
                                className="text-emerald-600"
                                size={42}
                            />

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                    <div className="relative">

                        <Search
                            className="absolute left-3 top-3 text-gray-400"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Search name, mobile, email, company..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                        />

                    </div>

                </div>

                {/* Table */}

                <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

                    <div className="overflow-x-auto">

                        <table className="min-w-[900px] w-full">

                            <thead className="bg-gray-100 dark:bg-gray-800">

                                <tr className="text-left whitespace-nowrap">

                                    <th className="px-6 py-4">
                                        Name
                                    </th>

                                    <th className="px-6 py-4">
                                        Mobile
                                    </th>

                                    <th className="px-6 py-4">
                                        Email
                                    </th>

                                    <th className="px-6 py-4">
                                        Company
                                    </th>

                                    <th className="px-6 py-4">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {contacts.data.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="py-10 text-center text-gray-500"
                                        >
                                            No contacts found.
                                        </td>

                                    </tr>

                                )}

                                {contacts.data.map(contact => (

                                    <tr
                                        key={contact.id}
                                        className="border-t dark:border-gray-700"
                                    >

                                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                                            {contact.first_name} {contact.last_name}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {contact.mobile}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {contact.email ?? '-'}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {contact.company ?? '-'}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                {contact.status}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-3 whitespace-nowrap">

                                                <button 
                                                className="text-blue-600 hover:underline"
                                                onClick={() => {
                                                    setSelectedContact(contact);
                                                    setEditOpen(true);
                                                }}
                                                >
                                                    Edit
                                                </button>

                                                <button 
                                                className="text-red-600 hover:underline"
                                                onClick={() => {
                                                    setSelectedContact(contact);
                                                    setDeleteOpen(true);
                                                }}
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                    {/* PAGINATION */}
                    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row p-3">

                        <p className="text-sm text-gray-500">
                            Showing {contacts.from} to {contacts.to} of {contacts.total} contacts
                        </p>

                        <div className="flex flex-wrap gap-2">

                            {contacts.links.map((link, index) => (

                                <Link
                                    key={index}
                                    href={link.url || "#"}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`rounded-md px-3 py-2 text-sm border transition ${
                                        link.active
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : link.url
                                            ? "bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
                                            : "cursor-not-allowed opacity-50"
                                    }`}
                                />

                            ))}

                        </div>

                    </div>
                
                </div>

            </div>

            <AddContactModal
                open={open}
                onOpenChange={setOpen}
            />
            <EditContactModal
                open={editOpen}
                onOpenChange={setEditOpen}
                contact={selectedContact}
            />
            <DeleteContactDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                contact={selectedContact}
            />

        </AppLayout>
    );
}