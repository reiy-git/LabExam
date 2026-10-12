import ApplicationLogo from '@/Components/ApplicationLogo';
import FlashMessage from '@/Components/FlashMessage';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="shrink-0">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('tickets.index')} active={route().current('tickets.index')}>
                                    Tickets
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden items-center gap-4 sm:flex">
                            <Link
                                href={route('tickets.create')}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                            >
                                + New Ticket
                            </Link>
                            <span className="text-sm font-medium text-gray-700">{user.name}</span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm text-gray-500 hover:text-gray-800"
                            >
                                Log Out
                            </Link>
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                                aria-label="Toggle menu"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(open ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('tickets.index')} active={route().current('tickets.index')}>
                            Tickets
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('tickets.create')} active={route().current('tickets.create')}>
                            New Ticket
                        </ResponsiveNavLink>
                    </div>
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <FlashMessage />

            <main>{children}</main>
        </div>
    );
}