import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function ForgotPassword({ status }) {
    const { t } = useTrans();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <SiteLayout>
            <Head title={t('forgot_password_title')} />

            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-neutral-900">{t('forgot_password_title')}</h1>
                        <p className="mt-2 text-neutral-600">
                            {t('forgot_password_description')}
                        </p>
                    </div>

                    <div className="rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden">
                <div className="p-6">
                    {status && (
                        <div className="mb-4 rounded-lg bg-purple-50 p-3 text-sm font-medium text-purple-600">
                            <div className="flex items-center">
                                <i className="fa-solid fa-check-circle mr-2"></i>
                                <span>{status}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mb-6">
                            <InputLabel htmlFor="email" value={t('email_address')} />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                icon="fa-envelope"
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

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
                                {t('send_reset_link')}
                            </button>

                            <div className="text-center text-sm text-neutral-600">
                                {t('remember_password')}{" "}
                                <Link href={route('login')} className="text-purple-600 hover:text-purple-800">
                                    {t('back_to_login')}
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                </div>
            </div>
        </SiteLayout>
    );
}
