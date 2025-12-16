import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function ResetPassword({ token, email }) {
    const { t } = useTrans();
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <SiteLayout>
            <Head title={t('reset_password_title')} />

            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-neutral-900">{t('reset_password_title')}</h1>
                        <p className="mt-2 text-neutral-600">
                            {t('reset_password_description')}
                        </p>
                    </div>

                    <div className="rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden">
                <div className="p-6">
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <InputLabel htmlFor="email" value={t('email_address')} />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                icon="fa-envelope"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="password" value={t('new_password')} />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                icon="fa-lock"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mb-6">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value={t('confirm_new_password')}
                            />
                            <TextInput
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                icon="fa-lock"
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
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
                                    <i className="fa-solid fa-key"></i>
                                )}
                                {t('reset_password')}
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
