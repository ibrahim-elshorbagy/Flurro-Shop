<?php

namespace App\Http\Controllers\Admin\Shop\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop\Category;

class CategoryController extends Controller
{
  public function index(Request $request)
  {
    $request->validate([
      'name' => ['nullable', 'string', 'max:255'],
      'sort' => ['nullable', 'string', 'in:name,created_at'],
      'direction' => ['nullable', 'string', 'in:asc,desc'],
      'per_page' => ['nullable', 'integer', 'min:1'],
    ]);

    $query = Category::query()
      ->with('parent');

    // Filtering
    if ($request->filled('name')) {
      $query->where('name', 'like', '%' . $request->name . '%');
    }

    // Sorting
    $sortField = $request->input('sort', 'id');
    $sortDirection = $request->input('direction', 'desc');
    $query->orderBy($sortField, $sortDirection);

    // Pagination
    $perPage = $request->input('per_page', 15);
    $categories = $query->paginate(intval($perPage))->withQueryString();
    $categories = $this->addRowNumbers($categories);

    // Get all categories for dropdown - will be filtered in frontend
    $allCategories = Category::with('parent')->orderBy('name')->get();

    return inertia('Admin/Shop/Category/Categories', [
      'categories' => $categories,
      'allCategories' => $allCategories,
      'queryParams' => $request->query() ?: null,
    ]);
  }

  public function store(Request $request)
  {
    $data = $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'slug' => ['nullable', 'string', 'regex:/^[a-zA-Z0-9-_]+$/', 'unique:categories,slug'],
      'parent_id' => ['nullable', 'integer', 'exists:categories,id'],
      'active' => ['required', 'boolean'],
    ]);

    // Backend validation: Only root categories (no parent) can be parents
    if ($data['parent_id']) {
      $parent = Category::find($data['parent_id']);
      if ($parent && $parent->parent_id !== null) {
        return back()->withErrors([
          'parent_id' => __('website_response.category_max_depth_error')
        ]);
      }
    }

    Category::create($data);

    return back()
      ->with('title', __('website_response.category_created_title'))
      ->with('message', __('website_response.category_created_message'))
      ->with('status', 'success');
  }

  public function update(Request $request, Category $category)
  {
    $data = $request->validate([
      'name' => ['required', 'string', 'max:255'],
      'slug' => ['nullable', 'string', 'regex:/^[a-zA-Z0-9-_]+$/', 'unique:categories,slug,' . $category->id],
      'parent_id' => ['nullable', 'integer', 'exists:categories,id'],
      'active' => ['required', 'boolean'],
    ]);

    // 1. Prevent setting itself as parent
    if ($data['parent_id'] == $category->id) {
      return back()->withErrors([
        'parent_id' => __('website_response.category_cannot_be_own_parent')
      ]);
    }

    // 2. Backend validation: Only root categories (no parent) can be parents
    if ($data['parent_id']) {
      $parent = Category::find($data['parent_id']);
      if ($parent && $parent->parent_id !== null) {
        return back()->withErrors([
          'parent_id' => __('website_response.category_max_depth_error')
        ]);
      }
    }

    // 3. If this category has children, it cannot become a child itself
    if ($data['parent_id'] && $category->children()->count() > 0) {
      return back()->withErrors([
        'parent_id' => __('website_response.category_has_children_error')
      ]);
    }

    $category->update($data);

    return back()
      ->with('title', __('website_response.category_updated_title'))
      ->with('message', __('website_response.category_updated_message'))
      ->with('status', 'success');
  }

  public function destroy(Request $request, ?Category $category = null)
  {
    // Handle both single and bulk deletions
    if ($request->has('ids')) {
      // Bulk deletion
      $request->validate([
        'ids' => ['required', 'array'],
        'ids.*' => ['required', 'integer', 'exists:categories,id'],
      ]);

      $deletedCount = 0;
      foreach ($request->ids as $id) {
        $category = Category::find($id);
        if ($category) {
          // Check if category has children before deleting
          if ($category->children()->count() > 0) {
            return back()->withErrors([
              'error' => __('website_response.category_delete_error_message')
            ]);
          }
          $category->delete();
          $deletedCount++;
        }
      }

      return back()
        ->with('title', __('website_response.categories_deleted_title'))
        ->with('message', __('website_response.categories_deleted_message', ['count' => $deletedCount]))
        ->with('status', 'warning');
    } else {
      // Single deletion
      if (!$category) {
        return back()->withErrors(['error' => 'Category not found']);
      }

      // Check if category has children before deleting
      if ($category->children()->count() > 0) {
        return back()->withErrors([
          'error' => __('website_response.category_delete_error_message')
        ]);
      }

      $category->delete();

      return back()
        ->with('title', __('website_response.category_deleted_title'))
        ->with('message', __('website_response.category_deleted_message'))
        ->with('status', 'warning');
    }
  }
}
