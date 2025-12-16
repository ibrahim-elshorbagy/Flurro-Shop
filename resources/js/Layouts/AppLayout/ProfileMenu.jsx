import React, { useState, useRef, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';
import LanguageToggle from '@/Components/LanguageToggle';
import { useTrans } from '@/Hooks/useTrans';

export default function ProfileMenu() {
  const { t } = useTrans();
  const { auth, impersonate_admin_id } = usePage().props;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle escape key press and click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuIsOpen(false);
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuIsOpen(false);
      }
    };

    if (menuIsOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [menuIsOpen]);

  const HandleLogout = () => {
    router.post(route('logout'), {}, { preserveScroll: true });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center rounded-xl gap-2 p-2 text-left text-neutral-800 hover:bg-purple-500/5 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 ${menuIsOpen ? 'bg-purple-500/10' : ''}`}
        aria-haspopup="true"
        aria-expanded={menuIsOpen}
        onClick={() => setMenuIsOpen((v) => !v)}
      >
        {auth.user?.image_url ? (
          <div className="size-8 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={auth.user.image_url}
              alt={auth.user.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="size-8 rounded-xl bg-purple-500 flex items-center justify-center text-white font-semibold">
            {auth.user?.name?.[0]?.toUpperCase() || '?'}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-bold text-black">{auth.user?.name || 'Guest'}</span>
          <span className="sr-only">profile settings</span>
        </div>
        <i className="fa-solid fa-chevron-down shrink-0" aria-hidden="true"></i>
      </button>

      {/* Dropdown Menu */}
      {menuIsOpen && (
        <div
          className="absolute top-full mt-2 ltr:right-0 rtl:left-0 w-48 z-50 border divide-y divide-neutral-300 border-neutral-300 bg-neutral-100 rounded-xl shadow-lg animate-fade-in"
          role="menu"
        >
          <div className="flex flex-col py-1.5">
            <Link
              href={route('profile.edit')}
              className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-neutral-800 underline-offset-2 hover:bg-purple-500/5 hover:text-black focus-visible:underline focus:outline-hidden"
              role="menuitem"
            >
              <i className="fa-solid fa-user shrink-0" aria-hidden="true"></i>
              <span>{t('profile')}</span>
            </Link>
          </div>
          {/* 
          <div className="flex flex-col py-1.5">
            <ThemeToggle className="w-full justify-start px-2 py-1.5 text-sm font-medium text-neutral-800 underline-offset-2 hover:bg-purple-500/5 hover:text-black focus-visible:underline focus:outline-hidden" />
          </div>

          <div className="flex flex-col py-1.5">
            <LanguageToggle className="w-full justify-start px-2 py-1.5 text-sm font-medium text-neutral-800 underline-offset-2 hover:bg-purple-500/5 hover:text-black focus-visible:underline focus:outline-hidden" />
          </div> */}

          {impersonate_admin_id && (
            <div className="flex flex-col py-1.5">
              <button
                onClick={() => router.post(route('admin.return_to_admin'), {}, { preserveScroll: true })}
                className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-blue-800 underline-offset-2 hover:bg-blue-500/10 hover:text-blue-900 focus-visible:underline focus:outline-hidden"
                role="menuitem"
              >
                <i className="fa-solid fa-user-shield shrink-0" aria-hidden="true"></i>
                <span>{t('return_to_admin')}</span>
              </button>
            </div>
          )}

          <div className="flex flex-col py-1.5">
            <button
              onClick={HandleLogout}
              className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-neutral-800 underline-offset-2 hover:bg-purple-500/5 hover:text-black focus-visible:underline focus:outline-hidden"
              role="menuitem"
            >
              <i className="fa-solid fa-right-from-bracket shrink-0" aria-hidden="true"></i>
              <span>{t('sign_out')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
