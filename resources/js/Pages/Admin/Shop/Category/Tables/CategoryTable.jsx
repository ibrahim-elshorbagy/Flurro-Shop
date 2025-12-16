import ActionButton from '@/Components/ActionButton';
import SelectableTable from '@/Components/SelectableTable';
import React from 'react';
import { useTrans } from '@/Hooks/useTrans';
import { router } from '@inertiajs/react';

export default function CategoryTable({ categories, onEdit }) {
  const { t } = useTrans();

  const handleDelete = (target) => {
    const isBulk = Array.isArray(target);
    const ids = isBulk ? target : [target.id];
    const itemCount = isBulk ? target.length : 1;

    if (confirm(t('confirm_category_delete', { number: itemCount }))) {
      router.delete(route('admin.shop.categories.destroy'), {
        data: { ids },
        preserveScroll: true,
      });
    }
  };

  // Table configuration
  const columns = [
    { field: 'row_number', label: t('serial'), icon: 'fa-hashtag' },
    { field: 'name', label: t('name'), icon: 'fa-tag' },
    { field: 'slug', label: t('slug'), icon: 'fa-link' },
    { field: 'parent', label: t('parent_category'), icon: 'fa-folder-tree' },
    { field: 'active', label: t('status'), icon: 'fa-toggle-on' },
    { field: 'created_at', label: t('created'), icon: 'fa-calendar' },
    { field: 'actions', label: t('actions'), icon: 'fa-gear', className: 'flex justify-center' }
  ];

  const sortOptions = [
    { field: 'name', label: t('name') },
    { field: 'created_at', label: t('created_at') }
  ];

  // Define bulk actions
  const bulkActions = [
    {
      label: t('delete_categories'),
      icon: 'fa-solid fa-trash-can',
      handler: (ids) => handleDelete(ids),
      variant: 'delete'
    }
  ];

  return (
    <SelectableTable
      columns={columns}
      data={categories ? categories.data : []}
      pagination={categories}
      routeName="admin.shop.categories.index"
      queryParams={{}}
      sortOptions={sortOptions}
      defaultSortField={'id'}
      defaultSortDirection={'desc'}
      bulkActions={bulkActions}
      pageParam={'page'}
      renderRow={(category) => (
        <>
          <td className="px-3 py-2 font-mono">{category.row_number}</td>
          <td className="px-3 py-2 font-semibold">{category.name}</td>
          <td className="px-3 py-2 font-mono text-sm text-neutral-600">{category.slug}</td>
          <td className="px-3 py-2">
            {category.parent ? (
              <span className="inline-flex items-center gap-1">
                <i className="fa-solid fa-folder-tree text-purple-500"></i>
                {category.parent.name}
              </span>
            ) : (
              <span className="text-neutral-400 italic">
                <i className="fa-solid fa-layer-group"></i> {t('root_category')}
              </span>
            )}
          </td>
          <td className="px-3 py-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              category.active
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {category.active ? t('active') : t('inactive')}
            </span>
          </td>
          <td className="px-3 py-2">{new Date(category.created_at).toLocaleDateString()}</td>
          <td className="px-3 py-2 flex justify-center gap-2">
            <ActionButton
              variant="edit"
              icon="fa-pen-to-square"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(category);
              }}
            >
              {t('edit')}
            </ActionButton>
            <ActionButton
              variant="delete"
              icon="fa-trash"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(category);
              }}
            >
              {t('delete')}
            </ActionButton>
          </td>
        </>
      )}
    />
  );
}
