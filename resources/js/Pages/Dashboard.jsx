import AppLayout from '@/Layouts/AppLayout';
import { Head, usePage } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans'

export default function Dashboard() {
  const { t } = useTrans()

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                        <h1>{t('hello_user', { name: usePage().props.auth.user.name })}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
