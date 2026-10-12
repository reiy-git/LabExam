import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ ticket }) {
    const destroy = () => {
        if (window.confirm(`Delete "${ticket.title}"? This cannot be undone.`)) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Ticket #{ticket.id}</h2>}
        >
            <Head title={ticket.title} />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <PriorityBadge value={ticket.priority} />
                        <StatusBadge value={ticket.status} />
                        <span className="text-sm text-gray-500">· {ticket.category}</span>
                    </div>

                    <p className="mt-5 whitespace-pre-wrap text-gray-700">{ticket.description}</p>

                    <p className="mt-5 text-xs text-gray-400">
                        Created {new Date(ticket.created_at).toLocaleString()} · Updated{' '}
                        {new Date(ticket.updated_at).toLocaleString()}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t pt-4">
                        <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:underline">
                            &larr; Back to tickets
                        </Link>
                        <div className="flex gap-3">
                            <Link
                                href={route('tickets.edit', ticket.id)}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                            >
                                Edit
                            </Link>
                            <button
                                type="button"
                                onClick={destroy}
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}