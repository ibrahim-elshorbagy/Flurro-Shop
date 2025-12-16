import React, { useState } from 'react'
import { useTrans } from '@/Hooks/useTrans';
import { Link, usePage } from '@inertiajs/react';
import ProfileMenu from './ProfileMenu';

export default function Navbar() {
  const { t } = useTrans();

  return (
    <nav className="max-md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200  h-auto sticky top-0 z-30">

      <ProfileMenu position="navbar" />
    </nav>
  )
}
