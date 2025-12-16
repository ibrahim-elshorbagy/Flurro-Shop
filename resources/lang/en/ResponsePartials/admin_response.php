<?php

return [
  /*
  |--------------------------------------------------------------------------
  | Admin Response Translations
  |--------------------------------------------------------------------------
  */

  /* User Management Responses */
  'user_created_title' => 'User Created',
  'user_created_message' => 'User has been created successfully.',
  'user_updated_title' => 'User Updated',
  'user_updated_message' => 'User has been updated successfully.',
  'user_deleted_title' => 'User Deleted',
  'user_deleted_message' => 'User has been deleted successfully.',
  'users_deleted_title' => 'Users Deleted',
  'users_deleted_message' => ':count users have been deleted successfully.',
  'user_blocked_title' => 'User Blocked',
  'user_blocked_message' => 'User has been blocked successfully.',
  'user_unblocked_title' => 'User Unblocked',
  'user_unblocked_message' => 'User has been unblocked successfully.',
  'user_delete_error_title' => 'Delete Error',
  'user_delete_error_self_message' => 'You cannot delete your own account.',

  /* Category Management Responses */
  'category_created_title' => 'Category Created',
  'category_created_message' => 'Category has been created successfully.',
  'category_updated_title' => 'Category Updated',
  'category_updated_message' => 'Category has been updated successfully.',
  'category_deleted_title' => 'Category Deleted',
  'category_deleted_message' => 'Category has been deleted successfully.',
  'categories_deleted_title' => 'Categories Deleted',
  'categories_deleted_message' => ':count categories have been deleted successfully.',
  'category_delete_error_title' => 'Delete Error',
  'category_delete_error_message' => 'Cannot delete category with subcategories.',
  'category_cannot_be_own_parent' => 'A category cannot be its own parent.',
  'category_max_depth_error' => 'Only root categories can be selected as parent. This maintains a maximum 2-level hierarchy.',
  'category_has_children_error' => 'This category has subcategories and cannot be converted to a child category.',
  'category_has_children_info' => 'This category has subcategories. Parent selection is disabled.',
  'no_parent_categories_available' => 'No parent categories available. Create a root category first.',

  /* Admin Impersonation Responses */
  'impersonation_success_title' => 'Logged in as User',
  'impersonation_success_message' => 'Successfully logged in as user: :name',
  'impersonation_return_title' => 'Returned to Admin',
  'impersonation_return_message' => 'Successfully returned to the admin account.',
  'impersonation_failed_title' => 'Return Failed',
  'impersonation_failed_message' => 'Unable to return to the admin account.',
];
