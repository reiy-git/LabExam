import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

const cleanLabel = (label) =>
    label.replace('&laquo;', '«').replace('&raquo;', '»');

export default function Index({ tickets, filters, options }) {
    const applyFilter = (key, value) => {
        router.get(
            route('tickets.index'),
            { ...filters, [key]: value || undefined },
            { preserveState: true, replace: true }
        );
    };

    const destroy = (ticket) => {
        if (window.confirm(`Delete "${ticket.title}"? This cannot be undone.`)) {
            router.delete(route('tickets.destroy', ticket.id), { preserveScroll: true });
        }
    };

    const select =
        'rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">My Tickets</h2>
                    <Link
                        href={route('tickets.create')}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        + New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="Tickets" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Filters */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                    <select
                        className={select}
                        value={filters.status ?? ''}
                        onChange={(e) => applyFilter('status', e.target.value)}
                    >
                        <option value="">All statuses</option>
                        {options.statuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <select
                        className={select}
                        value={filters.priority ?? ''}
                        onChange={(e) => applyFilter('priority', e.target.value)}
                    >
                        <option value="">All priorities</option>
                        {options.priorities.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                {tickets.data.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
                        <h3 className="text-lg font-semibold text-gray-800">No tickets yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {filters.status || filters.priority
                                ? 'No tickets match your filters.'
                                : 'Create your first ticket to get started.'}
                        </p>
                        <Link
                            href={route('tickets.create')}
                            className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            Create a ticket
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden overflow-hidden rounded-lg bg-white shadow md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {['Title', 'Category', 'Priority', 'Status', 'Created', ''].map((h) => (
                                            <th
                                                key={h}
                                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {tickets.data.map((t) => (
                                        <tr key={t.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                <Link href={route('tickets.show', t.id)} className="hover:text-indigo-600">
                                                    {t.title}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{t.category}</td>
                                            <td className="px-6 py-4"><PriorityBadge value={t.priority} /></td>
                                            <td className="px-6 py-4"><StatusBadge value={t.status} /></td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(t.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="space-x-3 px-6 py-4 text-right text-sm">
                                                <Link href={route('tickets.edit', t.id)} className="text-indigo-600 hover:underline">
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => destroy(t)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="space-y-3 md:hidden">
                            {tickets.data.map((t) => (
                                <div key={t.id} className="rounded-lg bg-white p-4 shadow">
                                    <Link
                                        href={route('tickets.show', t.id)}
                                        className="block font-semibold text-gray-900 hover:text-indigo-600"
                                    >
                                        {t.title}
                                    </Link>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {t.category} · {new Date(t.created_at).toLocaleDateString()}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <PriorityBadge value={t.priority} />
                                        <StatusBadge value={t.status} />
                                    </div>
                                    <div className="mt-3 flex gap-4 border-t pt-3 text-sm">
                                        <Link href={route('tickets.edit', t.id)} className="text-indigo-600">
                                            Edit
                                        </Link>
                                        <button type="button" onClick={() => destroy(t)} className="text-red-600">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {tickets.last_page > 1 && (
                            <nav className="mt-6 flex flex-wrap justify-center gap-1">
                                {tickets.links.map((link, i) =>
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            preserveScroll
                                            className={`rounded-md border px-3 py-1 text-sm ${
                                                link.active
                                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            {cleanLabel(link.label)}
                                        </Link>
                                    ) : (
                                        <span
                                            key={i}
                                            className="rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-400"
                                        >
                                            {cleanLabel(link.label)}
                                        </span>
                                    )
                                )}
                            </nav>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}