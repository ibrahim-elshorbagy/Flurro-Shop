import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function VerifyEmail({ status }) {
    const { t } = useTrans();
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <SiteLayout>
            <Head title={t('verify_email_title')} />

            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-neutral-900">{t('verify_email_title')}</h1>
                        <p className="mt-2 text-neutral-600">
                            {t('verify_email_description')}
                        </p>
                    </div>

                    <div className="rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                            <i className="fa-solid fa-envelope text-2xl text-purple-500"></i>
                        </div>
                    </div>

                    <div className="text-center mb-6 text-neutral-700">
                        <p className="mb-2">
                            {t('email_verification_notice')}
                        </p>
                        <p>
                            {t('email_verification_instruction')}
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 rounded-lg bg-purple-50 p-3 text-sm font-medium text-purple-600">
                            <div className="flex items-center">
                                <i className="fa-solid fa-check-circle mr-2"></i>
                                <span>{t('verification_link_sent')}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-6">
                        <div className="flex flex-col space-y-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center items-center gap-1 px-4 py-2 font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition-all disabled:opacity-70"
                            >
                                {processing ? (
                                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                                ) : (
                                    <i className="fa-solid fa-paper-plane"></i>
                                )}
                                {t('resend_verification_email')}
                            </button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full flex justify-center items-center gap-1 px-4 py-2 font-semibold text-neutral-700 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-all"
                            >
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                {t('log_out')}
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
                </div>
            </div>
        </SiteLayout>
    );
}
