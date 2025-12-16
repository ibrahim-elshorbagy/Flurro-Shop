import React from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useTrans } from '@/Hooks/useTrans';

export default function ErrorLayout({ children, status }) {
  const { t } = useTrans();

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-purple-50 via-neutral-50  pt-6 sm:justify-center sm:pt-0">
      <div className="h-32 w-32 mb-4">
        <Link href={route('home')}>
          <ApplicationLogo className="fill-current text-purple-500 " />
        </Link>
      </div>

      <div className="w-full max-w-md px-6 py-4">
        <div className="flex flex-col items-center justify-center text-center">
          {status && (
            <h1 className="text-8xl font-bold text-purple-500 mb-4">{status}</h1>
          )}
          {children}
        </div>
      </div>

      {/* <div className="mt-8 text-center text-sm text-neutral-500 ">
        <p>&copy; {new Date().getFullYear()} <a href="https://www.linkedin.com/in/ibrahim-elshorbagy/" className='text-purple-500 underline'>ibrahim elshorbagy</a>. All rights reserved.</p>
      </div> */}
    </div>
  );
}
