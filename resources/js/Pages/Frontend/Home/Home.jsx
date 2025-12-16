import SiteLayout from '@/Layouts/SiteLayout/SiteLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import HeroSection from './Partials/HeroSection';
import { useTrans } from '@/Hooks/useTrans';

export default function Home() {
  const { t } = useTrans();

  return (
    <SiteLayout>
      <Head title={t('welcome')} />

      <HeroSection />

    </SiteLayout>
  );
}
