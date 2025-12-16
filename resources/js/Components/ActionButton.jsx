import React from 'react';
import { Link } from '@inertiajs/react';

export default function ActionButton({
  variant = 'primary', // primary, edit, delete, status, etc.
  className = '',
  disabled,
  children,
  icon,
  size = 'xs', // 'xs', 'sm', 'md'
  as = 'button', // 'button' or 'a' for links
  href, // Only used if as="a"
  ...props
}) {
  // Define variant colors and hover states
  const variants = {
    primary: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    edit: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    delete: 'bg-red-100 text-red-700 hover:bg-red-200',
    status: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    success: 'bg-green-100 text-green-700 hover:bg-green-200',
    info: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
  };


  // Size classes for the button
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm'
  };

  // Build the icon element if provided
  const iconElement = icon ? <i className={`fa-solid ${icon}`}></i> : null;

  // Construct the common classes for both button and link
  const commonClasses = `flex items-center gap-1 ${sizeClasses[size]} font-medium rounded-lg transition-all ${variants[variant]} ${disabled && 'opacity-70'
    } ${className}`;

  // Return either a button or a Link component based on the "as" prop
  if (as === 'a') {
    return (
      <Link
        href={href}
        className={commonClasses}
        {...props}
      >
        {iconElement}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={commonClasses}
      disabled={disabled}
      {...props}
    >
      {iconElement}
      {children}
    </button>
  );
}
