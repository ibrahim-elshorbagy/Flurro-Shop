import React from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useTrans } from '@/Hooks/useTrans';

export default function HeroSection() {
  const { t } = useTrans();

  return (
    <section className="relative overflow-hidden h-screen flex items-center  justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100" />
      <div className="absolute -right-24 -top-24 w-72 h-72 bg-indigo-200/60 rounded-full blur-3xl" />
      <div className="absolute -left-32 bottom-0 w-80 h-80 bg-blue-200/60 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center lg:items-start lg:text-left">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/70 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {t('home')}
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
          <span className="block">
            {t('website_name')}
          </span>
          <span className="mt-2 block bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
            {t('hero_title_main')}
          </span>
        </h1>


        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <PrimaryButton
            as="a"
            href={route('login')}
            size="large"
            className="px-8 py-3 text-base md:text-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
          >
            {t('get_started')}
          </PrimaryButton>

        </div>

      </div>
    </section>
  );
}
