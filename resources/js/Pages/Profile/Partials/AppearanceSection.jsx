import React from 'react';
import { useTrans } from '@/Hooks/useTrans';
import ThemeToggle from '@/Components/ThemeToggle';
import UpdateLanguagePreferences from './UpdateLanguagePreferences';

export default function AppearanceSection() {
  const { t } = useTrans();

  return (
    <div className="bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden animate-fadeIn">
      <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
        <h2 className="font-semibold text-neutral-900 flex items-center gap-2">
          <i className="fa-solid fa-palette text-purple-500"></i>
          {t('appearance')}
        </h2>
      </div>
      <div className="p-6">
        <div className="max-w-xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-900">{t('theme_settings')}</h3>
              <p className="mt-1 text-sm text-neutral-600">
                {t('customize_appearance')}
              </p>
            </div>

            <div className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-neutral-200">
                  <div>
                    <h4 className="font-medium text-neutral-900">{t('theme_mode')}</h4>
                    <p className="text-sm text-neutral-600">
                      {t('choose_theme')}
                    </p>
                  </div>
                  <div>
                    <ThemeToggle className="px-3 py-2 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors" />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-neutral-200">
                  <UpdateLanguagePreferences />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
