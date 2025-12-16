import React from 'react';
import ErrorLayout from '@/Layouts/ErrorLayout/ErrorLayout';
import { Head, Link } from '@inertiajs/react';
import { useTrans } from '@/Hooks/useTrans';

export default function ErrorPage({ status }) {
  const { t } = useTrans();

  const title = {
    503: t('server_error'),
    500: t('server_error'),
    404: t('not_found'),
    403: t('forbidden'),
    401: t('unauthorized'),
    429: t('too_many_requests'),
    419: t('page_expired'),
  }[status] || t('error');

  const description = {
    503: t('server_error_message'),
    500: t('server_error_message'),
    404: t('page_not_found'),
    403: t('access_denied'),
    401: t('unauthorized_message'),
    429: t('too_many_requests_message'),
    419: t('page_expired_message'),
  }[status] || t('error_occurred');

  return (
    <ErrorLayout status={status}>
      <Head title={title} />
      <div className="rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden">
        <div className="p-6 min-w-[300px] lg:min-w-[400px]">
          <div className="mb-4 flex justify-center">
            <i className="fa-solid fa-triangle-exclamation text-6xl text-red-500"></i>
          </div>

          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
            {title}
          </h2>
          <p className="text-neutral-600 mb-6">
            {description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={route('dashboard')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
            >
              <i className="fa-solid fa-home"></i>
              {t('return_home')}
            </Link>
          </div>
        </div>
      </div>
    </ErrorLayout>
  );
}
