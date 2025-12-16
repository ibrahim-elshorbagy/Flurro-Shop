<?php

return [
  /*
  |--------------------------------------------------------------------------
  | All Website Lines
  |--------------------------------------------------------------------------
  |
  | This file includes all translation partials for better organization
  |
  */

  'website_name' => 'Flurro',
  'website_footer_description' => 'Flurro is a modern, open-source, and user-friendly web application designed to help you build dashboards.',



  // Include admin dashboard translations
  ...include __DIR__ . '/partials/admin/admin_dashboard.php',

  // Include user dashboard translations
  ...include __DIR__ . '/partials/user/user_dashboard.php',

  // Include frontend/home translations
  ...include __DIR__ . '/partials/frontend/frontend.php',

  ...include __DIR__ . '/partials/frontend/home.php',
];
