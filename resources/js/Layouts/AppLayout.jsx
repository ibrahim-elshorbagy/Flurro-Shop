import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import { usePage, Link } from '@inertiajs/react';
import Toastify from './Partials/toastify';
import { useTrans } from '@/Hooks/useTrans';
import SidebarProfileMenu from './AppLayout/ProfileMenu';
import Navbar from './AppLayout/Navbar';

export default function AppLayout({ children, title }) {
  const { locale } = usePage().props;

  const { t } = useTrans();
  const { auth } = usePage().props;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const handleSidebarToggleForMobile = () => {
    setSidebarIsOpen(v => !v);
  };

  return (
    <div className="font-sans antialiased" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className=" bg-gray-100 min-h-[100vh]" >

        {/* Mobile Navbar */}
        <nav className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200 sticky top-0 z-40">
          <button
            type="button"
            className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label={t('open_sidebar')}
            onClick={handleSidebarToggleForMobile}
          >
            <i className="fa-solid fa-bars size-6"></i>
          </button>
          <div className="w-8" />
          {/* Profile menu at the bottom */}
          <SidebarProfileMenu />
        </nav>

        {/* Dark overlay for mobile sidebar */}
        {sidebarIsOpen && (
          <div
            className="fixed inset-0 z-20 bg-neutral-800/10 backdrop-blur-xs md:hidden"
            aria-hidden="true"
            onClick={() => setSidebarIsOpen(false)}
            style={{ transition: 'opacity 0.2s' }}
          />
        )}

        <div className="relative flex w-full flex-col md:flex-row min-h-screen">
          {/* Sidebar Navigation */}
          <Sidebar sidebarIsOpen={sidebarIsOpen} setSidebarIsOpen={setSidebarIsOpen} />

          {/* Main Content with Footer */}
          <div className="flex-1 flex flex-col min-w-0 relative">
            {/* Top header */}
            <Navbar />

            {/* Main content */}
            <main className="flex-1 w-full">
              {children}
            </main>

          </div>

        </div>
      </div>

      <Toastify />
    </div>
  );
}
