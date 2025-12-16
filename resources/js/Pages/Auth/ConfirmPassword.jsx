import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head, useForm } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function ConfirmPassword() {
    const { t } = useTrans();
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <SiteLayout>
            <Head title={t('confirm_password_title')} />

            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-neutral-900">{t('confirm_password_title')}</h1>
                        <p className="mt-2 text-neutral-600">
                            {t('confirm_password_description')}
                        </p>
                    </div>

                    <div className="rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden">
                <div className="p-6">
                    <div className="mb-4 flex items-center p-3 rounded-lg bg-amber-50 text-sm text-amber-800">
                        <i className="fa-solid fa-shield-halved mr-2"></i>
                        <span>{t('security_area_notice')}</span>
                    </div>

                    <form onSubmit={submit} className="mt-4">
                        <div className="mb-6">
                            <InputLabel htmlFor="password" value={t('password')} />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                                icon="fa-lock"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center items-center gap-1 px-4 py-2 font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition-all disabled:opacity-70"
                        >
                            {processing ? (
                                <i className="fa-solid fa-circle-notch animate-spin"></i>
                            ) : (
                                <i className="fa-solid fa-check-circle"></i>
                            )}
                            {t('confirm_password')}
                        </button>
                    </form>
                </div>
            </div>
                </div>
            </div>
        </SiteLayout>
    );
}
