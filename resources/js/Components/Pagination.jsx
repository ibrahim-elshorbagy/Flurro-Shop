import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="mt-6 mb-4 flex justify-center items-center gap-1">
            {links?.map((link, index) => (
                <Link
                    key={index}
                    preserveScroll
                    href={link.url || "#"}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`inline-flex justify-center items-center h-8 min-w-8 px-3 rounded-lg text-sm transition-colors
                        ${link.active ? "bg-purple-500 text-white font-medium" : ""}
                        ${!link.url
                            ? "text-neutral-400 cursor-not-allowed"
                            : "text-neutral-700 hover:bg-purple-100 hover:text-purple-700"
                        }
                    `}
                />
            ))}
        </nav>
    );
}
