import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateLanguagePreferences from './Partials/UpdateLanguagePreferences';
import UpdateProfileImageForm from './Partials/UpdateProfileImageForm';
import AppLayout from '@/Layouts/AppLayout';
import { useState, useEffect } from 'react';
import { useTrans } from '@/Hooks/useTrans';
import AppearanceSection from './Partials/AppearanceSection';

export default function Edit({ mustVerifyEmail, status }) {
  const { t } = useTrans();
  const [activeSection, setActiveSection] = useState('profile-info');

  // Check if URL has a hash and set the active section on load
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setActiveSection(hash);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.substring(1);
      if (newHash) {
        setActiveSection(newHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Handle menu item click
  const handleMenuClick = (section) => {
    setActiveSection(section);
    window.location.hash = section;
  };

  return (
    <AppLayout>
      <Head title={t('profile_settings')} />

      <div className='m-3 xl:m-5'>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar with navigation */}
          <div className="lg:col-span-1">

            <div className="bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden sticky top-4">
              <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                <h1 className="text-2xl font-bold text-neutral-900">
                  {t('profile_settings')}
                </h1>
                <p className="text-neutral-600 text-sm">
                  {t('manage_account_settings')}
                </p>
              </div>
              <div className="p-2 space-y-2">
                <button
                  onClick={() => handleMenuClick('profile-info')}
                  className={`flex w-full items-center gap-2 p-2 rounded-lg text-neutral-700 hover:bg-neutral-200 transition-all ${activeSection === 'profile-info' ? 'bg-purple-500/10 text-black font-medium' : ''}`}
                >
                  <i className={`fa-solid fa-user-circle ${activeSection === 'profile-info' ? 'text-purple-500' : ''}`}></i>
                  <span>{t('profile_information')}</span>
                </button>
                <button
                  onClick={() => handleMenuClick('security')}
                  className={`flex w-full items-center gap-2 p-2 rounded-lg text-neutral-700 hover:bg-neutral-200 transition-all ${activeSection === 'security' ? 'bg-purple-500/10 text-black font-medium' : ''}`}
                >
                  <i className={`fa-solid fa-shield-alt ${activeSection === 'security' ? 'text-purple-500' : ''}`}></i>
                  <span>{t('security')}</span>
                </button>
                <button
                  onClick={() => handleMenuClick('account')}
                  className={`flex w-full items-center gap-2 p-2 rounded-lg text-neutral-700 hover:bg-neutral-200 transition-all ${activeSection === 'account' ? 'bg-purple-500/10 text-black font-medium' : ''}`}
                >
                  <i className="fa-solid fa-user-minus text-red-500"></i>
                  <span>{t('account_management')}</span>
                </button>
                {/* <button
                  onClick={() => handleMenuClick('appearance')}
                  className={`flex w-full items-center gap-2 p-2 rounded-lg text-neutral-700 hover:bg-neutral-200 transition-all ${activeSection === 'appearance' ? 'bg-purple-500/10 text-black font-medium' : ''}`}
                >
                  <i className={`fa-solid fa-palette ${activeSection === 'appearance' ? 'text-purple-500' : ''}`}></i>
                  <span>{t('appearance')}</span>
                </button> */}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 min-h-[60vh]">
            {/* Content based on active section */}
            {activeSection === 'profile-info' && (
              <div className="bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden animate-fadeIn">
                <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
                  <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                    <i className="fa-solid fa-user-circle text-purple-500"></i>
                    {t('profile_information')}
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-8">
                    <UpdateProfileImageForm />
                    <hr className="border-neutral-200" />
                    <UpdateProfileInformationForm
                      mustVerifyEmail={mustVerifyEmail}
                      status={status}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div className="bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden animate-fadeIn">
                <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
                  <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                    <i className="fa-solid fa-shield-alt text-purple-500"></i>
                    {t('security')}
                  </h2>
                </div>
                <div className="p-6">
                  <UpdatePasswordForm />
                </div>
              </div>
            )}

            {/* Account Management Section */}
            {activeSection === 'account' && (
              <div className="bg-neutral-100 rounded-xl border border-red-200 overflow-hidden animate-fadeIn">
                <div className="p-4 border-b border-red-200 bg-red-50 flex items-center justify-between">
                  <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
                    <i className="fa-solid fa-exclamation-triangle text-red-500"></i>
                    {t('danger_zone')}
                  </h2>
                </div>
                <div className="p-6">
                  <DeleteUserForm />
                </div>
              </div>
            )}

            {/* Appearance Section */}
            {/* {activeSection === 'appearance' && (
              <AppearanceSection />
            )} */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
