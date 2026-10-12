import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);

    const message = flash?.success || flash?.error;
    const isError = !flash?.success && !!flash?.error;

    useEffect(() => {
        if (!message) return;
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [flash]);

    if (!message || !visible) return null;

    return (
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8" role="status">
            <div
                className={`flex items-center justify-between rounded-md border px-4 py-3 text-sm ${
                    isError
                        ? 'border-red-200 bg-red-50 text-red-800'
                        : 'border-green-200 bg-green-50 text-green-800'
                }`}
            >
                <span>{message}</span>
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    className="ml-4 font-bold leading-none"
                    aria-label="Dismiss message"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}