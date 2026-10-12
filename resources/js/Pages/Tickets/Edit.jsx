import PrimaryButton from '@/Components/PrimaryButton';
import TicketFields from '@/Components/TicketFields';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ ticket, options }) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('tickets.update', ticket.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Ticket #{ticket.id}</h2>}
        >
            <Head title={`Edit Ticket #${ticket.id}`} />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="rounded-lg bg-white p-6 shadow">
                    <TicketFields data={data} setData={setData} errors={errors} options={options} />

                    <div className="mt-6 flex items-center justify-end gap-4">
                        <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:underline">
                            Cancel
                        </Link>
                        <PrimaryButton disabled={processing}>
                            {processing ? 'Saving...' : 'Update Ticket'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}