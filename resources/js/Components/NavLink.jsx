import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    onClick,
    href,
    ...props
}) {
    // If onClick is provided and href starts with #, render as button
    if (onClick && href && href.startsWith('#')) {
        return (
            <button
                onClick={onClick}
                className={
                    'capitalize inline-flex items-center border-b-2 px-1 pt-1  font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                    (active
                        ? 'border-purple-400 text-purple-900 focus:border-purple-600'
                        : 'border-transparent text-purple-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700') +
                    className
                }
                {...props}
            >
                {children}
            </button>
        );
    }

    // Default Link behavior
    return (
        <Link
            href={href}
            onClick={onClick}
            className={
                'capitalize inline-flex items-center border-b-2 px-1 pt-1  font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-purple-400 text-purple-900 focus:border-purple-600'
                    : 'border-transparent text-purple-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700') +
                className
            }
            {...props}
        >
            {children}
        </Link>
    );
}
