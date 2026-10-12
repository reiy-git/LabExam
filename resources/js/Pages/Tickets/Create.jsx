import PrimaryButton from '@/Components/PrimaryButton';
import TicketFields from '@/Components/TicketFields';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ options }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        category: options.categories[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">New Ticket</h2>}
        >
            <Head title="New Ticket" />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="rounded-lg bg-white p-6 shadow">
                    <TicketFields data={data} setData={setData} errors={errors} options={options} />

                    <div className="mt-6 flex items-center justify-end gap-4">
                        <Link href={route('tickets.index')} className="text-sm text-gray-600 hover:underline">
                            Cancel
                        </Link>
                        <PrimaryButton disabled={processing}>
                            {processing ? 'Saving...' : 'Create Ticket'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}