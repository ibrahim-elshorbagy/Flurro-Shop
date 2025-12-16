import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function Register() {
    const { t } = useTrans();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <SiteLayout>
            <Head title={t('register')} />

            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-neutral-900">{t('create_account_title')}</h1>
                        <p className="mt-2 text-neutral-600">
                            {t('create_account_description')}
                        </p>
                    </div>

                    <div className="rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden">
                <div className="p-6">
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <InputLabel htmlFor="name" value={t('full_name')} />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                icon="fa-user"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="username" value={t('username')} />
                            <TextInput
                                id="username"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('username', e.target.value)}
                                required
                                icon="fa-at"
                            />
                            <InputError message={errors.username} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="email" value={t('email_address')} />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                icon="fa-envelope"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="password" value={t('password')} />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                icon="fa-lock"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mb-6">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value={t('password_confirmation')}
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                required
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
                                    <i className="fa-solid fa-user-plus"></i>
                                )}
                                {t('create_account')}
                            </button>

                            <div className="text-center text-sm text-neutral-600">
                                {t('already_have_account')}{" "}
                                <Link href={route('login')} className="text-purple-600 hover:text-purple-800">
                                    {t('login')}
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
