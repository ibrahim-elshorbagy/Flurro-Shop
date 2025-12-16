<?php

return [
  /*
  |--------------------------------------------------------------------------
  | All Website Controllers Responses Lines
  |--------------------------------------------------------------------------
  |
  | This file includes all response translation partials for better organization
  |
  */
  
  // Include admin response translations
  ...include __DIR__ . '/ResponsePartials/admin_response.php',

  // Include user response translations
  ...include __DIR__ . '/ResponsePartials/user_response.php',
];
